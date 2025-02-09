import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { RecipeService } from './services/recipe/recipe.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppRoutingModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  getScreenWidth: number = 0;
  getScreenHeight: number = 0;

  constructor(private router: Router, private recipeService: RecipeService) { }
  firebaseConfig = {
    apiKey: "AIzaSyBikdJPbVXmRCpak-vOnNQjFYABZOnImUo",
    authDomain: "foddielife.firebaseapp.com",
    projectId: "foddielife",
    storageBucket: "foddielife.firebasestorage.app",
    messagingSenderId: "10819365749",
    appId: "1:10819365749:web:1f325834733988a92a013c",
    measurementId: "G-VCDX5K4WNC"
  };
  app = initializeApp(this.firebaseConfig);
  analytics = getAnalytics(this.app);
  title = 'FoodieLife';
  hide = true;
  hideUserMenu = true;
  desktop = true;
  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.recipeService.setRecipePrices();
    this.resize();
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() { this.resize() }

  resize() {
    this.getScreenWidth = window.innerWidth;
    if (this.getScreenWidth <= 1020) {
      this.desktop = false;
    }
    else {
      this.desktop = true;
    }
  }
  goTo(url: string) {
    this.router.navigate([url]);
  }
  showHide() {
    this.hide = !this.hide;
    this.hideUserMenu = true;
  }
  showHideUserMenu() {
    this.hideUserMenu = !this.hideUserMenu;
    this.hide = true;
  }
}
