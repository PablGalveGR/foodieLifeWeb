import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IngredientService } from '../../../services/ingredient/ingredient.service';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { TypeService } from '../../../services/type/type.service';
import { Ingredient } from '../../ingredient/Ingredient';
import { IngredientQuantity } from '../IngredientQuantity';
import { TextFormatterComponent } from '../../text-formatter/text-formatter.component';
import { Recipe } from '../Recipe';
import { Step } from '../Step';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recipe-add',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, FormsModule,TextFormatterComponent],
  templateUrl: './recipe-add.component.html',
  styleUrl: './recipe-add.component.css'
})
export class RecipeAddComponent {
  constructor(
    private ingredientService: IngredientService,
    private typeService: TypeService,
    private recipeService: RecipeService,
    private route: ActivatedRoute, 
    private router :Router,
    private location: Location) { }
  recipe: Recipe = {
    id: 0,
        name: '',
        description: '',
        ingredients: [],
        steps: [],
        difficulty:0,
        picture:'',
        price:0
  };
  ingredientsRecipe: Ingredient[] = [];
  ingredientsFiltered: Ingredient[] = [];

  ngOnInit() {
    //Gest all the ingredients to let the user choose
     this.ingredientService.getIngredients().subscribe(ings => this.ingredientsFiltered = ings);
  }
  /*Recipe Functions*/
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
  saveRecipe() {
    if(this.recipe.name != undefined && this.recipe.steps.length > 0 && this.recipe.ingredients.length > 0){
    //Code to change when DB implemented 
    this.recipe.id = 0;
    console.log("Recipe to Add: "+ JSON.stringify(this.recipe));
    this.recipeService.saveRecipe(this.recipe);
    this.goToDetail(this.recipe.id);
    }
    else{
      console.log("The recipe needs to have a name. ingredients and steps");
    }
    
  }
  /*Ingredients Functions*/
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
  clearFilter(filter? : HTMLInputElement) {//Cleans the table of the ingredients that are not added to the recipe
    let allIngs: Ingredient[] = [];
    this.ingredientService.getIngredients().subscribe(ings => allIngs = ings);
    this.ingredientsFiltered = [];
    for (let ing of allIngs) {
      if (!this.ingredientsRecipe.find(i => i.id == ing.id)) {
        this.ingredientsFiltered.push(ing);
      }
    }
    if(filter){
      filter.value = "";
    }
  }
  addIngredientQuantity(id: number, quant: string) {/// Adds the quantity of the given ingredient when focusout of the HTML's input
    let ing = this.recipe.ingredients.find(i => i.id == id)!;
    ing.quantity = Number(quant);
    this.recipe.price = this.recipeService.recipePrice( 0, this.recipe);
  }
  addIngredient(id: number) {
    let newIng: IngredientQuantity = { id: id, quantity: 0 };
    this.recipe.ingredients.push(newIng!);
    this.getRecipeIngredients(this.recipe.ingredients);
    this.clearFilter();
  }
  deleteIngredient(id: number) {
    let index = this.recipe.ingredients.findIndex(i => i.id == id)!;
    this.recipe.ingredients.splice(index, 1);
    this.getRecipeIngredients(this.recipe.ingredients);
    this.clearFilter();
  }
  /*Steps Functions*/
  textFormatterUpdate(step :number , text : string){
    this.recipe.steps.find( s => s.id == step)!.body = text;
  }
  addStepToRecipe() {
    let newStep: Step = {
      id: 0,
      idRecipe: 0,
      order: 0,
      title: '',
      body: '',
      time: 0
    }
    if (this.recipe.steps.length != 0 || !this.recipe.steps == undefined) {
      const previousStep = this.recipe.steps[this.recipe.steps.length - 1];
      newStep.id = previousStep.id + 1;
      newStep.order = previousStep.order + 1;
    }
    newStep.idRecipe = this.recipe.id;
    this.recipe.steps.push(newStep);
  }
  deleteStep(id: number) {
    let index: number = this.recipe.steps.findIndex(s => s.id == id);
    console.log("Deleted Step: " + JSON.stringify(this.recipe.steps[index]));
    this.recipe.steps.splice(index, 1);
  }
  /*Nav functions*/
  goBack(){
    this.location.back();
  }
  goToDetail(id : number){
    this.router.navigateByUrl('/recipes/recipe/detail/' + id);
  }
}
