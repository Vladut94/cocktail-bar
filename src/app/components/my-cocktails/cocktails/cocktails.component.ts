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

  constructor(private stateCocktailService: StateCocktailService) { }

  ngOnInit(): void {
    this.stateCocktailService.cocktails$
      .subscribe((cocktails => this.cocktails = cocktails));
  }

}
