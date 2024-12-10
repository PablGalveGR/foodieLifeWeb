import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IngredientsComponent } from './components/ingredient/ingredients/ingredients.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { IngredientDetailComponent } from './components/ingredient/ingredient-detail/ingredient-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppRoutingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontFoodieLife';
}
