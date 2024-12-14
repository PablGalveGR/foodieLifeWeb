import { Injectable } from '@angular/core';
import { Ingredient } from '../../components/ingredient/Ingredient';
import { ingredients } from '../../components/ingredient/ingredients';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor() {
    
   }
  ingredients : Ingredient[]  = ingredients;
  getIngredients() : Observable<Ingredient[]>{
    return of(this.ingredients);
  }
  getIngredient(id : number) : Observable<Ingredient>{
    const ing = of(this.ingredients.find(i => i.id === id)!);
    return ing;
  }
  saveUpdatedIngredient(ing : Ingredient){
    for( let i = 0; i < this.ingredients.length; i++){
      if(this.ingredients[i].id === ing.id){
        this.ingredients[i] = ing;
        break;
      }
    }
    console.log("Updated ingredient: " + JSON.stringify(ing));
    console.log("Updated ingredients list" + JSON.stringify(ingredients));
  }
  saveIngredient( ing : Ingredient){
    ingredients.push(ing);
  }
}
