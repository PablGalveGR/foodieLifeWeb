import { Component } from '@angular/core';
import { Recipe } from '../Recipe';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  constructor( private recipeService: RecipeService){}
  recipes?: Recipe[];
  ngOnInit(){
    this.getRecipes();
  }
  getRecipes(){
    this.recipeService.getRecipes().subscribe(r => this.recipes = r);
  }

}
