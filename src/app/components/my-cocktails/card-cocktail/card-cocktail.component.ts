import {Component, Input, OnInit} from '@angular/core';
import {StateCocktailService} from "../../../core/services/state-cocktail.service";
import { Cocktail} from "../../../core/interfaces/cocktail.interface";


@Component({
  selector: 'card-cocktail',
  templateUrl: './card-cocktail.component.html',
  styleUrls: ['./card-cocktail.component.css']
})
export class CardCocktailComponent implements OnInit {
  @Input() cocktail !: Cocktail;

  constructor(private stateCocktailService: StateCocktailService) { }

  ngOnInit(): void {

  }

}
