import { Component } from '@angular/core';
import { Recipe } from '../Recipe';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { IngredientQuantity } from '../IngredientQuantity';
@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  constructor( private recipeService: RecipeService, private router :Router){}
  recipes?: Recipe[];
  boxView: boolean = true;
  ngOnInit(){
    this.getRecipes();
  }
  changeView(){
    this.boxView = !this.boxView;
  }
  getRecipes(){
    this.recipeService.getRecipes().subscribe(r => this.recipes = r);
  }
  deleteRecipe(id : number){
    this.recipeService.deleteRecipe(id);
  }
  goToAdd(){
    this.router.navigate(['/recipes/recipe/add']);
  }
  getNumberOfIngredients(id : number){
    return this.recipeService.getNumberOfIngredients(id);
  }
  getNumberOfSteps(id : number){
    return this.recipeService.getNumberOfSteps(id);
  }
  getItsVegeterianVegan(ings : IngredientQuantity[]) : boolean[]{
    return this.recipeService.getItsVegeterianVegan(ings);
  }
  goToDetail(id : number){
    this.router.navigate(['/recipes/recipe/detail/'+id ]);
  }

}
