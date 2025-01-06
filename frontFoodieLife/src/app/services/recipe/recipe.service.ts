import { Injectable } from '@angular/core';
import { recipes } from '../../components/recipe/recipes';
import { Observable, of } from 'rxjs';
import { Recipe } from '../../components/recipe/Recipe';
import { IngredientService } from '../ingredient/ingredient.service';
import { Ingredient } from '../../components/ingredient/Ingredient';
import { IngredientQuantity } from '../../components/recipe/IngredientQuantity';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private ingredientService: IngredientService) { }
  recipes = recipes;
  getRecipes(): Observable<Recipe[]> {
    return of(this.recipes);
  }
  getXRecipes(ids: number[]): Observable<Recipe[]> {
    let returnedRecipes: Recipe[] = [];
    for (let id of ids) {
      returnedRecipes.push(this.recipes.find(rec => rec.id == id)!);
    }
    return of(returnedRecipes);
  }
  getRecipe(id: number): Observable<Recipe> {
    return of(recipes.find(r => r.id == id)!);
  }
  getNumberOfIngredients(id: number) {
    let num = this.recipes[id].ingredients.length;
    return num;
  }
  getNumberOfSteps(id: number) {
    let num = this.recipes[id].steps.length;
    return num;
  }
  saveRecipeUpdated(recipe: Recipe) {

    if (this.recipes.length != 0) {
      let index = this.recipes.findIndex(r => r.id == recipe.id)
      if (index != undefined) {
        this.recipes[index] = recipe;
      }
    }

  }
  saveRecipe(recipe: Recipe) {
    recipe.id = this.getLastId() + 1;
    this.recipes.push(recipe);
  }
  deleteRecipe(id: number) {
    let index = this.recipes.findIndex(r => r.id == id);
    if (index >= 0) {
      recipes.splice(index, 1);
    }
  }
  getLastId(): number {
    if (this.recipes.length != 0) {
      return this.recipes[this.recipes.length - 1].id;
    }
    return 0;
  }
  getItsVegeterianVegan(ings: IngredientQuantity[]): boolean[] {//Array [Vegetarian. Vegan]
    let veggie = true;
    let vegan = true;
    for (let ingr of ings) {
      let ingredient: Ingredient = {
        id: 0,
        name: '',
        type: 0,
        price: 0,
        description: '',
        vegetarian: false,
        vegan: false,
        measure: ''
      };
      this.ingredientService.getIngredient(ingr.id).subscribe(ing => ingredient = ing);
      if (!ingredient.vegan) {
        vegan = false;
      }
      if (!ingredient.vegetarian) {
        veggie = false;
      }
      if (!vegan && !veggie) {
        return [veggie, vegan];
      }
    }
    return [veggie, vegan];
  }
}
