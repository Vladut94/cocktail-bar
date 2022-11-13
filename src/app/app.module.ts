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
import { ModalCocktailComponent } from './components/my-cocktails/modal-cocktail/modal-cocktail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NotFoundComponent,
    AddCocktailComponent,
    CocktailsComponent,
    CardCocktailComponent,
    ModalCocktailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
