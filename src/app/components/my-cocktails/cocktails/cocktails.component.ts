import { Component, OnInit } from '@angular/core';
import {StateCocktailService} from "../../../core/services/state-cocktail.service";
import {Cocktail} from "../../../core/interfaces/cocktail.interface";

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css']
})
export class CocktailsComponent implements OnInit {
  cocktails!: Cocktail[];
  searchText: string = '';

  constructor(private stateCocktailService: StateCocktailService) { }

  ngOnInit(): void {
    this.displayAllCocktails();
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }

  displayAllCocktails() {
    this.stateCocktailService.cocktails$
      .subscribe((cocktails => this.cocktails = cocktails));
  }

  displayFilteredCocktails(filteredValue: boolean) {
    this.displayAllCocktails();
    this.cocktails = this.cocktails.filter((filteredCockteils) =>
      filteredCockteils.withAlcohol === filteredValue);
  }
}
