import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    zipcode: new FormControl(''),
    password: new FormControl('', Validators.required),
    password_confirmation: new FormControl('', Validators.required)
  })


  isError: boolean = false;


  constructor(private router: Router) { }

  signup(){
    if(this.signupForm.valid){
      this.router.navigate(['/']);
    } else {
      this.isError = true;
    }
  }

  validatePassword(){

  }
}
