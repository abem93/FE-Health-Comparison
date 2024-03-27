import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./features/landing/landing.component").then((c) => c.LandingComponent)
  },
  {
    path: "login",
    loadComponent: () => import("./features/auth/login/login.component").then((c) => c.LoginComponent)
  },
  {
    path: "signup",
    loadComponent: () => import("./features/auth/signup/signup.component").then((c) => c.SignupComponent)
  },
  {
    path: "hospitals",
    loadComponent: () => import("./features/hospitals/hospitals.component").then((c) => c.HospitalsComponent),
    children: [
      {
          path: "details/:id",
          loadComponent: () => import("./features/hospitals/hospitals.component").then((c) => c.HospitalsComponent)
      },
    ]
  },
  {
    path: "profile",
    loadComponent: () => import("./features/profile/profile.component").then((c) => c.ProfileComponent)
  },

  { path: '**', component: PageNotFoundComponent }
];
