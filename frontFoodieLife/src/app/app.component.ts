import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppRoutingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router) { }
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
  goTo(url: string) {
    this.router.navigate([url]);
  }
}
