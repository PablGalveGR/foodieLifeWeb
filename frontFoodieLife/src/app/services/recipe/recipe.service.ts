import { Injectable } from '@angular/core';
import { recipes } from '../../components/recipe/recipes';
import { Observable, of } from 'rxjs';
import { Recipe } from '../../components/recipe/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }
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
  getNumberOfIngredients(id : number){
    let num = this.recipes[id].ingredients.length;
    return num;
  }
  getNumberOfSteps(id : number){
    let num = this.recipes[id].steps.length;
    return num;
  }
  saveRecipeUpdated(recipe: Recipe) {
    
    if (this.recipes.length != 0) {
      let index = this.recipes.findIndex(r => r.id == recipe.id)
      if(index != undefined){
        this.recipes[index] = recipe;
      }
    }
    
  }
  saveRecipe(recipe: Recipe) {
    recipe.id = this.getLastId() +1;
    this.recipes.push(recipe);
  }
  deleteRecipe(id: number) {
    let index = this.recipes.findIndex(r => r.id == id);
    if (index >= 0) {
      recipes.splice(index, 1);
    }
  }
  getLastId(): number {
    if(this.recipes.length != 0){
      return this.recipes[this.recipes.length - 1].id;
    }
    return 0;
  }
  getItsVegeterianVegan(id : number) :boolean[]{//Array [Vegetarian. Vegan]
    let recipe = this.recipes.find(r => r.id == id);
    let ingredients : boolean[][] = [[]];
    let veggie = true;
    let vegan = true;
    
    return [veggie , vegan];
  }
}
