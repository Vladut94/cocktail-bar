import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Cocktail} from "../interfaces/cocktail.interface";
import {ApiCocktailService} from "./api-cocktail.service";

@Injectable({
  providedIn: 'root'
})
export class StateCocktailService {
   cocktails$ = new BehaviorSubject<Cocktail[]>([]);
   private deleteCocktail$ = new Subject<number>();
   private editCocktail = new BehaviorSubject<any>({});
   public editCocktail$: Observable<Cocktail> = this.editCocktail.asObservable();

  constructor(private apiCocktailService: ApiCocktailService) {
     this.apiCocktailService.getCocktails().subscribe((cocktails => this.cocktails$.next(cocktails)));

     this.deleteCocktail$.subscribe((id: number) =>
       this.cocktails$.next(this.cocktails$.getValue()
         .filter((cocktail => {
            return cocktail.id != id
     }))));

  }

  deleteCocktail(id: number) {
    this.deleteCocktail$.next(id)
  }

  updateCocktail(editCocktail: Cocktail) {
    this.editCocktail.next(editCocktail);
  }
}
