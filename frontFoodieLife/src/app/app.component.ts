import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppRoutingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FoodieLife';
  constructor(private router : Router){}
  goTo(url : string){
    this.router.navigate([url]);
  }
}
