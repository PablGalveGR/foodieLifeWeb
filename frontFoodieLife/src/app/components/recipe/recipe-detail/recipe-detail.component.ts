import { Component } from '@angular/core';
import { IngredientService } from '../../../services/ingredient/ingredient.service';
import { TypeService } from '../../../services/type/type.service';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { Ingredient } from '../../ingredient/Ingredient';
import { Recipe } from '../Recipe';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Step } from '../Step';
import { FormsModule } from '@angular/forms';
import { IngredientQuantity } from '../IngredientQuantity';

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
    steps: []
  };
  recipeToEdit: Recipe = {
    id: 0,
    name: '',
    ingredients: [],
    steps: []
  };
  ingredientsRecipe: Ingredient[] = [];
  ingredientsFiltered : Ingredient[] = [];
  edit = false;

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
  getRecipeIngredients(ings: IngredientQuantity[]) {
    for (let ing of ings) {
      this.ingredientService.getIngredient(ing.id).subscribe(i => this.ingredientsRecipe?.push(i));
      console.log("Ingredient fetched: " + JSON.stringify(this.ingredientsRecipe[ing.id]));
    }
  }
  getRecipeIngredientQuantity(id: number): number {
    let quantity = 0;
    quantity = this.recipe.ingredients.find(i => i.id == id)!.quantity;
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
  filterBy(text : string){
    this.clearFilter();
    this.ingredientsFiltered = this.ingredientsFiltered.filter(i => i.name.toLowerCase().includes(text.toLowerCase()));
    console.log("Filtered :" + JSON.stringify(this.ingredientsFiltered) );

  }
  clearFilter(){
    let allIngs : Ingredient[] = [];
    this.ingredientService.getIngredients().subscribe( ings => allIngs = ings);
    this.ingredientsFiltered  = JSON.parse(JSON.stringify(allIngs));
    for(let i of this.ingredientsRecipe){
      let index = this.ingredientsFiltered.findIndex(ing => ing.id == i.id);
      if(index != undefined){
        this.ingredientsFiltered.splice(index, 1);
        console.log("Already added: ID: " + i.id + " Name: "+ i.name); 
      }
    }
  }
  addIngredient(id :number, quantity : string){
    let newIng : IngredientQuantity = {id: id, quantity: Number(quantity)};
    this.recipeToEdit.ingredients.push(newIng!);
    this.getRecipeIngredients(this.recipeToEdit.ingredients);
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
    if (this.edit) {
      this.recipeToEdit = Object.assign({}, this.recipe);
      this.clearFilter();
    }
    else {
      this.recipeToEdit = {
        id: 0,
        name: '',
        ingredients: [],
        steps: []
      };
    }
  }
}
