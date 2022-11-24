import {Component, Input, OnInit} from '@angular/core';
import {StateCocktailService} from "../../../core/services/state-cocktail.service";
import { Cocktail} from "../../../core/interfaces/cocktail.interface";
import {ApiCocktailService} from "../../../core/services/api-cocktail.service";


@Component({
  selector: 'card-cocktail',
  templateUrl: './card-cocktail.component.html',
  styleUrls: ['./card-cocktail.component.css']
})
export class CardCocktailComponent implements OnInit {
  @Input() cocktail !: Cocktail;

  cocktailToSend!: Cocktail;

  constructor(private stateCocktailService: StateCocktailService,
              private apiCocktailService: ApiCocktailService) { }

  ngOnInit(): void {

  }

  deleteCocktail(): void {
    this.apiCocktailService.deleteCocktail(this.cocktail.id).subscribe(() =>
      (this.stateCocktailService.deleteCocktail(this.cocktail.id)));
  }

  editCocktail() {
    console.log(this.cocktail);
    this.cocktailToSend = {
      id: this.cocktail.id,
      name: this.cocktail.name,
      author: this.cocktail.author,
      ingredients: this.cocktail.ingredients,
      description: this.cocktail.description,
      imageUrl: this.cocktail.imageUrl,
      withAlcohol: this.cocktail.withAlcohol
    }

    this.stateCocktailService.updateCocktail(this.cocktailToSend);
  }
}
