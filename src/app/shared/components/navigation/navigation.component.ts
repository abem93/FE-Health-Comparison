import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  constructor(public authService: AuthenticationService) {}
  logout() {
		this.authService.logout();
	}
}
