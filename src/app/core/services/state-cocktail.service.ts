import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Cocktail} from "../interfaces/cocktail.interface";
import {ApiCocktailService} from "./api-cocktail.service";

@Injectable({
  providedIn: 'root'
})
export class StateCocktailService {
   cocktails$ = new BehaviorSubject<Cocktail[]>([]);

  constructor(private apiCocktailService: ApiCocktailService) {
     this.apiCocktailService.getCocktails().subscribe((cocktails => this.cocktails$.next(cocktails)));
  }
}
