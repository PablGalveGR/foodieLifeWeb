import { Component } from '@angular/core';
import { TextFormatterComponent } from '../text-formatter/text-formatter.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TextFormatterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor() { }
}
