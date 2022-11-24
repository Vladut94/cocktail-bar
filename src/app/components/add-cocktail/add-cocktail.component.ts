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
  // @ts-ignore
  cocktailToEdit : Cocktail = null;

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
      this.shouldEditCocktail();
      if (this.cocktailToEdit) {
        this.actionBtn = "Edit";
      }
  }

  register() {
    if (this.cocktailToEdit){
      this.stateCocktailService.updateCocktail(this.cocktailForm.value, this.cocktailToEdit.id)
      this.resetCocktailForm();
      this.navigateAfterRegistered();
    }else {

      const payload = {
        name: this.cocktailForm.value['name'],
        author: this.cocktailForm.value['author'],
        ingredients: this.ingredients,
        description: this.cocktailForm.value['description'],
        imageUrl: this.cocktailForm.value['imageUrl'],
        withAlcohol: this.cocktailForm.value['withAlcohol'],
      }

      this.cocktailService.addCocktail(payload).subscribe(() => {
        this.resetCocktailForm();
        this.navigateAfterRegistered();
      });
    }

  }

  shouldEditCocktail() {

    this.stateCocktailService.getUpdatedCocktail().subscribe(editCocktail => {
      console.log(editCocktail);
      if (editCocktail) {
        editCocktail.ingredients.forEach((ingr) => this.ingredients.push(ingr));
        this.cocktailForm.controls['name'].setValue(editCocktail.name)
        this.cocktailForm.controls['author'].setValue(editCocktail.author)
        this.cocktailForm.controls['description'].setValue(editCocktail.description)
        this.cocktailForm.controls['imageUrl'].setValue(editCocktail.imageUrl)
        this.cocktailForm.controls['withAlcohol'].setValue(editCocktail.withAlcohol)
      }

      this.cocktailToEdit = editCocktail;
    });
  }

  resetCocktailForm() {
    this.cocktailForm.reset();
  }

  navigateAfterRegistered() {
    this.router.navigate(['my-cocktails']);
  }
}
