import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Cocktail} from "../interfaces/cocktail.interface";
import {ApiCocktailService} from "./api-cocktail.service";

@Injectable({
  providedIn: 'root'
})
export class StateCocktailService {
   cocktails$ = new BehaviorSubject<Cocktail[]>([]);
   // @ts-ignore
  private shouldUpdateCocktail$ = new BehaviorSubject<Cocktail>(null);
   private deleteCocktail$ = new Subject<number>();
   private updateCocktail$ = new Subject<Cocktail>()

  constructor(private apiCocktailService: ApiCocktailService) {
     this.apiCocktailService.getCocktails().subscribe((cocktails => this.cocktails$.next(cocktails)));

     this.deleteCocktail$.subscribe((id: number) =>
       this.cocktails$.next(this.cocktails$.getValue()
         .filter((cocktail => {
            return cocktail.id != id
     }))));

    this.updateCocktail$.subscribe((editedCocktail) => {
      this.cocktails$.next(this.cocktails$.getValue().map((cocktail) => {
        return cocktail.id === editedCocktail.id ? editedCocktail : cocktail
      }))
    });
  }

  deleteCocktail(id: number) {
    this.deleteCocktail$.next(id)
  }

  shouldUpdateCocktail(editCocktail: Cocktail) {
    this.shouldUpdateCocktail$.next(editCocktail);
  }

  getUpdatedCocktail(): Observable<Cocktail> {
     return this.shouldUpdateCocktail$;
  }

  updateCocktail(payload: Cocktail, id: number) {
     this.apiCocktailService.editCocktail(payload, id).subscribe((updatedCocktail) => {
       this.updateCocktail$.next(updatedCocktail);
     })
  }
}
