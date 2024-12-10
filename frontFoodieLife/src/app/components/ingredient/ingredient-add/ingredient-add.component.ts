import { Component } from '@angular/core';
import { Ingredient } from '../Ingredient';

@Component({
  selector: 'app-ingredient-add',
  standalone: true,
  imports: [],
  templateUrl: './ingredient-add.component.html',
  styleUrl: './ingredient-add.component.scss'
})
export class IngredientAddComponent {
  
  ingredient  : Ingredient= {
    id: 0,
    name: '',
    type: 0,
    price: 0,
    description: ''
  };
  getFromFormIngredient() {
    let form: HTMLElement = document.getElementById('ingForm')!;
    let data = new Map();
    if (form) {
      for (let i = 0; i < form.children.length; i++) {
        let element = form.children[i];
        if (element.getAttribute("type") != "button") {
          let name = element.getAttribute("name")?.toString();
          let value: HTMLInputElement = <HTMLInputElement>element;

          if (name) {
            if (element.getAttribute("type") == "number") {
              value.value = <string>(value.value);
            }
            data.set(name, value.value);
            this.saveIngredient(this.ingredient);
          }
        }
      }
    }
    this.ingredient = JSON.parse(JSON.stringify(Object.fromEntries(data)));
    console.log(JSON.stringify(this.ingredient));

  }
  // Function to save an ingredient to a JSON file
  saveIngredient(ingredient: Ingredient): void {


  }

}
