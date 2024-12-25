import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientDetailComponent } from '../components/ingredient/ingredient-detail/ingredient-detail.component';
import { IngredientsComponent } from '../components/ingredient/ingredients/ingredients.component';
import { IngredientAddComponent } from '../components/ingredient/ingredient-add/ingredient-add.component';
import { RecipesComponent } from '../components/recipe/recipes/recipes.component';
import { RecipeDetailComponent } from '../components/recipe/recipe-detail/recipe-detail.component';
import { RecipeAddComponent } from '../components/recipe/recipe-add/recipe-add.component';


export const routes: Routes = [
  {path: 'ingredients', component:IngredientsComponent},
  {path: 'ingredients/ingredient/detail/:id', component: IngredientDetailComponent},
  {path: 'ingredients/ingredient/add', component: IngredientAddComponent},
  {path: 'recipes', component: RecipesComponent},
  {path: 'recipes/recipe/detail/:id', component: RecipeDetailComponent},
  {path: 'recipes/recipe/add', component: RecipeAddComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
