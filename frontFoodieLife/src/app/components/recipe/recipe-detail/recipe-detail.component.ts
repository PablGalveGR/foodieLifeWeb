import { Component } from '@angular/core';
import { IngredientService } from '../../../services/ingredient/ingredient.service';
import { TypeService } from '../../../services/type/type.service';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { Ingredient } from '../../ingredient/Ingredient';
import { Recipe } from '../Recipe';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  constructor(
    private ingredientService: IngredientService,
    private typeService: TypeService,
    private recipeService: RecipeService,
    private route: ActivatedRoute) { }
  recipe: Recipe = {
    id: 0,
    name: '',
    ingredients: [],
    steps: [],
    ingredientQuantity: []
  };
  edit = false;
  ingredients: Ingredient[] = [];
  ngOnInit() {
    this.getRecipe();
  }
  getRecipe() {
    let id = Number(this.route.snapshot.paramMap.get('id'))!;
    this.recipeService.getRecipe(id).subscribe(r => this.recipe = r);
    this.recipe.steps.sort((a, b) => {//sorting the steps yo go by the desired order
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    }
    );
    this.getRecipeIngredients(this.recipe.ingredients);
  }
  getRecipeIngredients(ing: number[]) {
    for (let id of ing) {
      this.ingredientService.getIngredient(id).subscribe(i => this.ingredients?.push(i));
      console.log("Ingredient fetched: " + JSON.stringify(this.ingredients[id]));
    }
  }
  getRecipeIngredientQuantity(id : number) : number{
    let quantity = 0;
    quantity = this.recipe.ingredientQuantity.find( i => i.idIngredient == id)!.quantity;
    return quantity;
  }
  changeEdit(){
    this.edit = !this.edit;
  }
}
