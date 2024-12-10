import { Injectable } from '@angular/core';
import { Ingredient } from '../../components/ingredient/Ingredient';
import { ingredients } from '../../components/ingredient/ingredients';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor() { }
  getIngredients() : Observable<Ingredient[]>{
    const ings : Observable<Ingredient[]> = of(ingredients);
    return ings;
  }
  getIngredient(id : number) : Observable<Ingredient>{
    const ing = ingredients.find(i => i.id === id)!;
    return of(ing);
  }
  saveUpdatedIngredient(ing : Ingredient){
    for( let i = 0; i < ingredients.length; i++){
      if(ingredients[i].id === ing.id){
        ingredients[i] = ing;
        break;
      }
    }
    console.log("Updated ingredient: " + JSON.stringify(ing));
    console.log("Updated ingredients list" + JSON.stringify(ingredients));
  }
  saveIngredient( ing : Ingredient){

  }
}
