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
import { Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router) { }
  recipe: Recipe = {
    id: 0,
    name: '',
    description: '',
    ingredients: [],
    steps: [],
    difficulty: 0,
    picture: '',
    price: 0
  };
  recipeToEdit: Recipe = {
    id: 0,
    name: '',
    description: '',
    ingredients: [],
    steps: [],
    difficulty: 0,
    picture: '',
    price: 0
  };
  ingredientsRecipe: Ingredient[] = [];
  ingredientsFiltered: Ingredient[] = [];
  edit = false;

  ngOnInit() {
    this.getRecipe();
  }
  /*Recipe Functions*/
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
  getRecipeIngredients(ings: IngredientQuantity[]) {//Gets the ingredients based on the id passed on the Obj Array
    this.ingredientsRecipe = [];
    for (let ing of ings) {
      this.ingredientService.getIngredient(ing.id).subscribe(i => this.ingredientsRecipe?.push(i));
    }
  }
  getRecipeIngredientQuantity(id: number): number {///Called on the HTML
    let quantity = 0;
    quantity = this.recipe.ingredients.find(i => i.id == id)!.quantity;
    return quantity;
  }
  getRecipeToEditIngredientQuantity(id: number): number {///Called on the HTML
    let quantity = 0;
    quantity = this.recipeToEdit.ingredients.find(i => i.id == id)!.quantity;
    return quantity;
  }
  deleteRecipe(id: number) {
    this.recipeService.deleteRecipe(id);
    this.router.navigate(["/recipes"]);
  }
  changeEdit() {
    this.edit = !this.edit;
    if (this.edit) {
      console.log("Recipe: " + JSON.stringify(this.recipe));
      this.recipeToEdit = JSON.parse(JSON.stringify(this.recipe));
      this.clearFilter();
    }
    else {
      this.getRecipeIngredients(this.recipe.ingredients);
      this.recipeToEdit = {
        id: 0,
        name: '',
        description: '',
        ingredients: [],
        steps: [],
        difficulty: 0,
        picture: '',
        price: 0
      };
    }
  }
  saveRecipe() {
    this.recipe = JSON.parse(JSON.stringify(this.recipeToEdit));
    this.recipeService.saveRecipeUpdated(this.recipe);
    this.changeEdit();
  }
  /*Ingredients Functions*/
  goToIngredient(id: number) {
    this.router.navigate(['/ingredients/ingredient/detail/' + id]);
  }
  getType(id: number) {//Gets the Type of the ingredient
    let string = "";
    this.typeService.getType(id).subscribe(t => string = t.name);
    return string;
  }
  filterBy(text: string) {//Filters the ingredients by name
    this.clearFilter();
    this.ingredientsFiltered = this.ingredientsFiltered.filter(i => i.name.toLowerCase().includes(text.toLowerCase()));
    console.log("Filtered :" + JSON.stringify(this.ingredientsFiltered));

  }
  clearFilter() {//Cleans the table of the ingredients that are not added to the recipe
    let allIngs: Ingredient[] = [];
    this.ingredientService.getIngredients().subscribe(ings => allIngs = ings);
    this.ingredientsFiltered = [];
    for (let ing of allIngs) {
      if (!this.ingredientsRecipe.find(i => i.id == ing.id)) {
        this.ingredientsFiltered.push(ing);
      }
    }
  }
  addIngredientQuantity(id: number, quant: string) {/// Adds the quantity of the given ingredient when focusout of the HTML's input
    let ing = this.recipeToEdit.ingredients.find(i => i.id == id)!;
    ing.quantity = Number(quant);
    this.recipeToEdit.price = this.recipeService.recipePrice(this.recipeToEdit.id, this.recipeToEdit);
  }
  addIngredient(id: number) {
    let newIng: IngredientQuantity = { id: id, quantity: 0 };
    this.recipeToEdit.ingredients.push(newIng!);
    this.getRecipeIngredients(this.recipeToEdit.ingredients);
    this.clearFilter();
  }
  deleteIngredient(id: number) {
    let index = this.recipeToEdit.ingredients.findIndex(i => i.id == id)!;
    this.recipeToEdit.ingredients.splice(index, 1);
    this.getRecipeIngredients(this.recipeToEdit.ingredients);
    this.clearFilter();
  }
  /*Steps Functions*/
  addStepToRecipe() {
    let newStep: Step = {
      id: 0,
      idRecipe: 0,
      order: 0,
      title: '',
      body: '',
      time: 0
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
  getItsVegeterianVegan(ings: IngredientQuantity[]): boolean[] {
    return this.recipeService.getItsVegeterianVegan(ings);
  }
  getCost(quant: number, price: number) {
    return Math.round(quant * price * 100) / 100;
  }
}
