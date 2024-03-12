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
  passwordMatch: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router) { }

  signup(){
    if(this.signupForm.valid){
      console.log(this.signupForm)
    } else {
      this.isError = true;
      console.log(this.signupForm)
    }
  }

  validatePassword(signupForm: FormGroup) {
    let password = signupForm.value.password
    let confirm_password = signupForm.value.password_confirmation
    if(password != confirm_password) {
      this.passwordMatch = true
    } else {
      this.passwordMatch = false
    }
  }

  showPasswordToggle(signupForm: FormGroup) {
    const password = (document.getElementById('password') as HTMLInputElement)
    const confirm_password = (document.getElementById('password_confirmation') as HTMLInputElement)
    if(this.showPassword) {
      this.showPassword = !this.showPassword
      password.type = 'password'
      confirm_password.type = 'password'
    }else{
      this.showPassword = !this.showPassword
      password.type = 'text'
      confirm_password.type = 'text'
  }
}
}
