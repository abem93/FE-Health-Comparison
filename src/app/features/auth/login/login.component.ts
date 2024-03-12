import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  isError: boolean = false;


  constructor(private authService: AuthenticationService, private router: Router) { }

   login(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email;
      const password =  this.loginForm.value.password;


      this.authService.login(email, password).subscribe({
        next:(res:any) =>{
          console.log(res)
          this.authService.setToken(res.token)
          this.router.navigate(['/']);
        },
        error: (error:any) => {
          console.log('Error logging in', error)
          this.isError = true
        }
      })
    } else {
      this.isError = true;
   }
   }
}
