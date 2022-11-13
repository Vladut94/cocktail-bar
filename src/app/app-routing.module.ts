import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CocktailsComponent} from "./components/my-cocktails/cocktails/cocktails.component";
import {AddCocktailComponent} from "./components/add-cocktail/add-cocktail.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'add-cocktail', component: AddCocktailComponent},
  {path: 'my-cocktails', component: CocktailsComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
