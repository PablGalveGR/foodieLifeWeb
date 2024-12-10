import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientDetailComponent } from './components/ingredient/ingredient-detail/ingredient-detail.component';
import { IngredientsComponent } from './components/ingredient/ingredients/ingredients.component';

export const routes: Routes = [
    {path: '', component: IngredientsComponent},
    {path: 'detail/:id', component: IngredientDetailComponent}
];
