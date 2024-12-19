import { Component } from '@angular/core';
import { Ingredient } from '../Ingredient';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Type } from '../Type';
import { TypeService } from '../../../services/type/type.service';
import { NgFor } from '@angular/common';
import { IngredientService } from '../../../services/ingredient/ingredient.service';

@Component({
  selector: 'app-ingredient-add',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './ingredient-add.component.html',
  styleUrl: './ingredient-add.component.scss'
})
export class IngredientAddComponent {
  constructor(private location: Location,
    private typeService: TypeService,
    private ingredientService: IngredientService) { 
      console.log("Ingredients Service instance: " + JSON.stringify(ingredientService));
    }

  ingredient: Ingredient = {
    id: 0,
    name: '',
    type: 0,
    price: 0,
    description: '',
    vegetarian: false,
    vegan: false,
    measure: ''
  };
  types?: Type[];
  ngOnInit() {
    this.typeService.getTypes().subscribe(t => this.types = t);
  }

  saveIngredient(ingredient: Ingredient): void {
    if (ingredient != undefined) {
      let ings: Ingredient[] = [];
      this.ingredientService.getIngredients().subscribe(ingredients => ings = ingredients);
      if (ings != undefined) {
        const lastID: number = ings[ings.length - 1].id;
        this.ingredient.id = lastID + 1;
        this.ingredientService.saveIngredient(ingredient);
        console.log("Ingredient added: " + JSON.stringify(ings));
      }

    }

  }
  goBack() {
    this.location.back();
  }

}
