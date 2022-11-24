import {Component, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {ApiCocktailService} from "../../core/services/api-cocktail.service";
import {Router} from "@angular/router";
import {StateCocktailService} from "../../core/services/state-cocktail.service";
import {Cocktail} from "../../core/interfaces/cocktail.interface";



@Component({
  selector: 'app-add-cocktail',
  templateUrl: './add-cocktail.component.html',
  styleUrls: ['./add-cocktail.component.css']
})


export class AddCocktailComponent implements OnInit {
  cocktailForm : FormGroup;
  actionBtn: string = "Save";
  cocktailToEdit !: Cocktail;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  ingredients: string[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.ingredients.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(ingredient: string): void {
    const index = this.ingredients.indexOf(ingredient);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

  constructor(private formBuilder: FormBuilder,
              private cocktailService: ApiCocktailService,
              private stateCocktailService: StateCocktailService,
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
    if (!this.cocktailToEdit) {
      this.shouldEditCocktail();
    }
    this.actionBtn = "Save";

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

  shouldEditCocktail() {
    this.actionBtn = "Edit";

    this.stateCocktailService.editCocktail$.subscribe(editCocktail => {
      console.log(editCocktail);
      editCocktail.ingredients?.forEach((ingr) => this.ingredients.push(ingr));
      this.cocktailForm.controls['name'].setValue(editCocktail.name)
      this.cocktailForm.controls['author'].setValue(editCocktail.author)
      this.cocktailForm.controls['description'].setValue(editCocktail.description)
      this.cocktailForm.controls['imageUrl'].setValue(editCocktail.imageUrl)
      this.cocktailForm.controls['withAlcohol'].setValue(editCocktail.withAlcohol)
      // this.cocktailForm.patchValue({
      //   name: editCocktail.name,
      //   author: editCocktail.author,
      //   description: editCocktail.description,
      //   imageUrl: editCocktail.imageUrl,
      //   withAlcohol: editCocktail.withAlcohol,
      // })
      this.cocktailToEdit = editCocktail;
    });
    this.cocktailService.editCocktail(this.cocktailForm.value, this.cocktailToEdit.id);

  }
}
