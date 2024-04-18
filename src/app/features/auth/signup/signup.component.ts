import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'
import { AuthenticationService } from '../../../core/services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent  {
  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    zipcode: new FormControl(''),
    password: new FormControl('', Validators.required),
    password_confirmation: new FormControl('', Validators.required)
  })

  @Output() formSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  errorMessage: string[] = [];
  isError: boolean = false;
  passwordMatch: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router, private authService: AuthenticationService) { }



  signup(){
    const formValue = this.signupForm.value;
    console.log(formValue)
    this.authService.signup(formValue).subscribe({
      next:(res:any) =>{
        console.log(res)
        this.formSubmit.emit(true);
        this.isError = false
        setTimeout(() => {
          this.formSubmit.emit(false);
          this.router.navigate(['/login']);
        }, 1000)
      },
      error: (error:any) => {
        this.formSubmit.emit(false);
        setTimeout(() => {
          this.router.navigate(['/signup']);
        }, 3000)
        console.log('Error Signing up', error.error)
        this.isError = true
        this.errorMessage = error.error
      }
    })

  }

  validatePassword(signupForm: FormGroup) {
    let password = signupForm.value.password
    let confirm_password = signupForm.value.password_confirmation
    const submit = (document.getElementById('submit') as HTMLInputElement)
    if(confirm_password && password !== confirm_password) {
      this.passwordMatch = true;
      submit.disabled = true;
    }else if(password.length < 1 || confirm_password.length < 1){
      submit.disabled = true;
    }else {
      this.passwordMatch = false;
      submit.disabled = false;
    }
  }

  showPasswordToggle() {
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
