import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../Ingredient';
import { IngredientService } from '../../../services/ingredient/ingredient.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TypeService } from '../../../services/type/type.service';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css'
})
export class IngredientsComponent {
  constructor(private ingredientService: IngredientService, private typeService: TypeService) { 
    console.log("Ingredients Service instance: " + JSON.stringify(ingredientService));
  }
  ingredients: Ingredient[] = [];
  ngOnInit() {
    this.getIngredients();
  }
  getIngredients(): void {
    this.ingredientService.getIngredients().subscribe(ingredients => this.ingredients = ingredients);
    console.log("Ingredient List: " + JSON.stringify(this.ingredients));
  }
  getType(id:number) : string{
    let res : string = ''; 
    this.typeService.getType(id).subscribe(t => res = t.name);
    return res;
  }
  deleteIngredient(id :number){
    this.ingredientService.deleteIngredient(id);
  }
}
