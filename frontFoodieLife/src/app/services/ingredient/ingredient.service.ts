import { Injectable } from '@angular/core';
import { Ingredient } from '../../components/ingredient/Ingredient';
import { ingredients } from '../../components/ingredient/ingredients';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor() {   }
  ingredients : Ingredient[]  = ingredients;
  ngOnInit(){
    console.log("Service Ingredient Created");
  }
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
    this.ingredients.push(ing);
  }
  deleteIngredient( id:number){
    let index : number = this.ingredients.findIndex( i => i.id == id);
    console.log("Deleted ingredient: "+ JSON.stringify(this.ingredients[index]));
    this.ingredients.splice(index, 1);
  }
  getLastId() : number{
    return this.ingredients[ this.ingredients.length -1].id;
  }
  ngOnDestroy(){
    console.log("Service Ingredients Killed");
  }
}
