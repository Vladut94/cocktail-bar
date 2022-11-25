import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddCocktailComponent } from './components/add-cocktail/add-cocktail.component';
import { CocktailsComponent } from './components/my-cocktails/cocktails/cocktails.component';
import { CardCocktailComponent } from './components/my-cocktails/card-cocktail/card-cocktail.component';
import { SearchComponent } from './components/my-cocktails/search/search.component';


import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NotFoundComponent,
    AddCocktailComponent,
    CocktailsComponent,
    CardCocktailComponent,
    SearchComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
