import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-add-cocktail',
  templateUrl: './add-cocktail.component.html',
  styleUrls: ['./add-cocktail.component.css']
})


export class AddCocktailComponent implements OnInit {
valueOfIngredients : [] = [];

  constructor() { }

  ngOnInit(): void {
  }

  getIngredientsValue(){
    console.log('nu merge');
    // this.valueOfIngredients.push(event)
  }
}
