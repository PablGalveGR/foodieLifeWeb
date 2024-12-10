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
}
