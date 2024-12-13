import { Component } from '@angular/core';
import { Ingredient } from '../Ingredient';
import { Location } from '@angular/common';
import { ingredients } from '../ingredients';
import { FormsModule } from '@angular/forms';
import { Type } from '../Type';
import { TypeService } from '../../../services/type/type.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-ingredient-add',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './ingredient-add.component.html',
  styleUrl: './ingredient-add.component.scss'
})
export class IngredientAddComponent {
  constructor(private location: Location, private typeService : TypeService) { }

  ingredient: Ingredient = {
    id: 0,
    name: '',
    type: 0,
    price: 0,
    description: ''
  };
  types?: Type[];
  ngOnInit(){
    this.typeService.getTypes().subscribe(t => this.types = t);
  }

  saveIngredient(ingredient: Ingredient): void {
    if (ingredient != undefined) {
      const lastID = ingredients[ingredients.length - 1].id;
      this.ingredient.id = lastID + 1;
      ingredients.push(ingredient);
      console.log("Ingredient added: "+ JSON.stringify(ingredients));
    }

  }
  goBack() {
    this.location.back();
  }

}
