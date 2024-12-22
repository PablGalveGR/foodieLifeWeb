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
  getRecipes () : Observable<Recipe[]>{
    return of(this.recipes);
  }
  getRecipe(id:number) : Observable<Recipe>{
    return of(recipes.find(r => r.id == id)!);
  }
  saveRecipeUpdated(rep : Recipe){
    let index = this.recipes.findIndex(r => r.id == rep.id)
    if(index != undefined){
      this.recipes[index] = rep;
    }
  }
}
