import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IngredientDetailComponent } from '../components/ingredient/ingredient-detail/ingredient-detail.component';
import { IngredientsComponent } from '../components/ingredient/ingredients/ingredients.component';


export const routes: Routes = [
  {path: '', component: IngredientsComponent},
  {path: 'ingredientDetail/:id', component: IngredientDetailComponent}
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
