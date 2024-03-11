import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () => import("./features/auth/login/login.component").then((c) => c.LoginComponent)
  },
  {
    path: "signup",
    loadComponent: () => import("./features/auth/signup/signup.component").then((c) => c.SignupComponent)
  }
];
