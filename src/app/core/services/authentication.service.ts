
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  login(email: string, password: string) {
    return this.http.post<{token: string}>(`${environment.apiUrl}/login`, { email, password })
    // .pipe(switchMap((res:any) => {
    //   this.setToken(res.token);
    //   return this.userService.getBootstrapData()
    // }))
  }

  signup(data:any){
    return this.http.post(`${environment.apiUrl}/users`, data);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(){
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
