import { Component } from '@angular/core';
import { Ingredient } from '../Ingredient';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from '../../../services/ingredient/ingredient.service';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Type } from '../Type';
import { TypeService } from '../../../services/type/type.service';

@Component({
  selector: 'app-ingredient-detail',
  standalone: true,
  imports: [NgIf, FormsModule, NgFor],
  templateUrl: './ingredient-detail.component.html',
  styleUrl: './ingredient-detail.component.css'
})
export class IngredientDetailComponent {
  constructor(private route: ActivatedRoute,
    private ingredientService: IngredientService, 
    private typeService: TypeService) { 
      console.log("Ingredients Service instance: " + JSON.stringify(ingredientService));
    }
  ingredient?: Ingredient;
  ingredientToEdit?: Ingredient;
  edit?: boolean;
  types?: Type[];
  ngOnInit() {
    this.getIngredient();
    this.edit = false;
    this.typeService.getTypes().subscribe(types => this.types = types);
    console.log(JSON.stringify(this.ingredient));
  }
  getIngredient(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ingredientService.getIngredient(id).subscribe(ingr => this.ingredient = ingr);
    this.ingredientToEdit = Object.assign({}, this.ingredient);
  }
  changeEditable(): void {
    this.edit = !this.edit;
  }
  saveUpdateIngredient(ing: Ingredient): void {
    this.ingredient = this.ingredientToEdit;
    this.ingredientService.saveUpdatedIngredient(ing);
  }
  getType(id: number) {
    let t : Type = this.types?.find(type => type.id == id)!;
    return t.name;
  }
  ngOnDestroy(){
    console.log("Detail Killed");
  }
}
