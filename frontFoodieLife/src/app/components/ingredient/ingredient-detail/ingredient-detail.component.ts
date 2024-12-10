import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../Ingredient';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from '../../../services/ingredient/ingredient.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ingredient-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './ingredient-detail.component.html',
  styleUrl: './ingredient-detail.component.css'
})
export class IngredientDetailComponent {
  constructor(private route: ActivatedRoute,
    private ingredientService: IngredientService) { }
  ingredient?: Ingredient;
  edit? : boolean;
  ngOnInit() {
    this.getIngredient();
    this.edit = false;
    console.log(JSON.stringify(this.ingredient));
  }
  getIngredient(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ingredientService.getIngredient(id).subscribe(ingr => this.ingredient = ingr);
  }
}
