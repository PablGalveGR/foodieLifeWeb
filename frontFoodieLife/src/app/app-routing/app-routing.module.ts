import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IngredientDetailComponent } from '../components/ingredient/ingredient-detail/ingredient-detail.component';
import { IngredientsComponent } from '../components/ingredient/ingredients/ingredients.component';
import { IngredientAddComponent } from '../components/ingredient/ingredient-add/ingredient-add.component';


export const routes: Routes = [
  {path: '', redirectTo: 'ingredients', pathMatch: 'full'},
  {path:'ingredients', component:IngredientsComponent},
  {path: 'ingredients/ingredient/detail/:id', component: IngredientDetailComponent},
  {path: 'ingredients/ingredient/add', component: IngredientAddComponent}
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
