import {Component, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {ApiCocktailService} from "../../core/services/api-cocktail.service";
import {Router} from "@angular/router";


export interface Ingredient {
  name: string;
}

@Component({
  selector: 'app-add-cocktail',
  templateUrl: './add-cocktail.component.html',
  styleUrls: ['./add-cocktail.component.css']
})


export class AddCocktailComponent implements OnInit {
  cocktailForm : FormGroup;
  actionBtn: string = "Save";

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  ingredients: Ingredient[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.ingredients.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Ingredient): void {
    const index = this.ingredients.indexOf(fruit);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

  constructor(private formBuilder: FormBuilder,
              private cocktailService: ApiCocktailService,
              private router: Router) {
    this.cocktailForm = new FormGroup<any>({
      name : new FormControl('', Validators.required),
      author : new FormControl('', Validators.required),
      ingredients : new FormControl('', Validators.required),
      description : new FormControl('', Validators.required),
      imageUrl : new FormControl('', Validators.required),
      withAlcohol : new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  register() {
   const payload = {
     name: this.cocktailForm.value['name'],
     author: this.cocktailForm.value['author'],
     ingredients: this.ingredients,
     description: this.cocktailForm.value['description'],
     imageUrl: this.cocktailForm.value['imageUrl'],
     withAlcohol: this.cocktailForm.value['withAlcohol'],
   }

   this.cocktailService.addCocktail(payload).subscribe();

   this.cocktailForm.reset();
   this.router.navigate(['my-cocktails']);
  }
}
