import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
