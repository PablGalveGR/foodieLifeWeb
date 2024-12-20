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
import { Step } from '../Step';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, FormsModule],
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
  ingredients: Ingredient[] = [];
  recipeToEdit: Recipe = {
    id: 0,
    name: '',
    ingredients: [],
    steps: [],
    ingredientQuantity: []
  }; 
  edit = false;

  ngOnInit() {
    this.getRecipe();
    this.recipeToEdit = this.recipe;
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
  getRecipeIngredientQuantity(id: number): number {
    let quantity = 0;
    quantity = this.recipe.ingredientQuantity.find(i => i.idIngredient == id)!.quantity;
    return quantity;
  }
  getIngredientsForRecipeEdit(): Ingredient[] {
    let ings: Ingredient[] = [];
    this.ingredientService.getIngredients().subscribe(i => ings = i)!;
    return ings;
  }
  getType(id: number) {
    let string = "";
    this.typeService.getType(id).subscribe(t => string = t.name);
    return string;
  }
  addStepToRecipe() {
    let newStep: Step = {
      id: 0,
      idRecipe: 0,
      order: 0,
      title: '',
      body: ''
    }
    if (this.recipeToEdit.steps.length != 0 || !this.recipeToEdit.steps == undefined) {
      const previousStep = this.recipeToEdit.steps[this.recipeToEdit.steps.length - 1];
      newStep.id = previousStep.id + 1;
      newStep.order = previousStep.order + 1;
    }
    newStep.idRecipe = this.recipeToEdit.id;
    this.recipeToEdit.steps.push(newStep);
  }
  deleteStep(id: number) {
    let index: number = this.recipeToEdit.steps.findIndex(s => s.id == id);
    console.log("Deleted Step: " + JSON.stringify(this.recipeToEdit.steps[index]));
    this.recipeToEdit.steps.splice(index, 1);
  }
  changeEdit() {
    this.edit = !this.edit;
    if(this.edit){
      this.recipeToEdit = Object.assign({}, this.recipe);
    }
    else{
      this.recipeToEdit = {
        id: 0,
        name: '',
        ingredients: [],
        steps: [],
        ingredientQuantity: []
      };
    }
  }
}
