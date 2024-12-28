import { Component, Type } from '@angular/core';
import { RecipeService } from '../../services/recipe/recipe.service';
import { IngredientService } from '../../services/ingredient/ingredient.service';
import { NgFor, NgIf } from '@angular/common';
import { Recipe } from '../recipe/Recipe';
import { Router } from '@angular/router';
import { TypeService } from '../../services/type/type.service';
import { IngredientQuantity } from '../recipe/IngredientQuantity';
import { Ingredient } from '../ingredient/Ingredient';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private router: Router,
    private typeService: TypeService) { }
  recipes: Recipe[] = [];
  ngOnInit() {
    this.getRecipes();
  }
  getRecipes() {
    this.recipeService.getXRecipes([1, 0, 2]).subscribe(recis => this.recipes = recis);
  }
  getRecipeIngredients(ings: IngredientQuantity[]): Ingredient[] {//Gets the ingredients based on the id passed on the Obj Array
    let ingredients : Ingredient [] = [];
    for (let ing of ings) {
      this.ingredientService.getIngredient(ing.id).subscribe(i => ingredients.push(i));
    }
    return ingredients;
  }
  goToRecipe(id: number) {
    this.router.navigate(['/recipes/recipe/detail/' + id]);
  }
  goToIngredient(id: number) {
    this.router.navigate(['/ingredients/ingredient/detail/' + id]);
  }
  getType(id: number) {//Gets the Type of the ingredient
    let string = "";
    this.typeService.getType(id).subscribe(t => string = t.name);
    return string;
  }
  getRecipeIngredientQuantity(id: number, recipe: Recipe): number {///Called on the HTML
    let quantity = 0;
    quantity = recipe.ingredients.find(i => i.id == id)!.quantity;
    return quantity;
  }
}
