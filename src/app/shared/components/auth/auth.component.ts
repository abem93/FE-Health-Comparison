import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  isLoading: boolean = false;

  onActivate(component: any) {
    component.formSubmit.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }
}
