import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthenticationService } from './core/services/authentication.service';
import { UserService } from './core/services/user.service';
import { of } from 'rxjs';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// export function initializeUserData(userService: UserService, authService: AuthenticationService) {
//   if(authService.isLoggedIn()){
//     return userService.getBootstrapData().subscribe()
//   }else{
//     return () => of(null)
//   }

// }

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  // {
  //   provide: APP_INITIALIZER,
  //   useFactory: initializeUserData,
  //   deps: [UserService, AuthenticationService],
  //   multi: true
  // },
  provideHttpClient()
  ]
};
