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
  getRecipe(id:number){}
}
