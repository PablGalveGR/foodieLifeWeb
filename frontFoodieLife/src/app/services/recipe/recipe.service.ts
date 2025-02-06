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
    let noRecipes: Recipe[] = [{
      id: 0,
      name: 'No recipes Found',
      description: 'The are no recipes saved in the system',
      ingredients: [],
      steps: [],
      difficulty: 0,
      picture: '',
      price: 0
    }]
    for (let id of ids) {
      let recipe = this.recipes.find(rec => rec.id == id);
      if (recipe != undefined) {
        returnedRecipes.push(recipe);
      }
    }
    if (returnedRecipes.length == 0) {
      return of(noRecipes);
    }
    else {
      return of(returnedRecipes);
    }
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
        this.recipePrice(recipe.id);
      }
    }

  }
  saveRecipe(recipe: Recipe) {
    recipe.id = this.getLastId() + 1;
    this.recipes.push(recipe);
    this.recipePrice(recipe.id);
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
    for (let ingr of ings) {
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
  setRecipePrices(){
    for(let i = 0; i<this.recipes.length;i++){
      this.recipes[i].price = this.recipePrice(this.recipes[i].id);
    }
  }
  recipePrice(id:number , recipe_?: Recipe){
    let total = 0;
    let recipe = recipe_;
    if(recipe == undefined){///If recipe not passed by parameter, look for it with the id
      recipe = {
        id: 0,
        name: '',
        description: '',
        ingredients: [],
        steps: [],
        difficulty: 0,
        picture: '',
        price: 0
      }; 
      this.getRecipe(id).subscribe( r => recipe = r);
    }      
    for(let ing of recipe.ingredients){
      let ingredient : Ingredient = {
        id: 0,
        name: '',
        type: 0,
        price: 0,
        description: '',
        vegetarian: false,
        vegan: false,
        measure: ''
      };
      this.ingredientService.getIngredient(ing.id).subscribe(i => ingredient = i);
      total += (ingredient.price * ing.quantity);
    }
    return Math.round(total * 100) / 100;
  }
}
