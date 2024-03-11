import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../shared/model/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserBehaviorSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) { }

  setCurrentUser(user: User | null) {
    this.currentUserBehaviorSubject.next(user);
  }

  getBootstrapData() {
    return this.http.get(`${environment.apiUrl}/web/bootstrap`).pipe(
      tap((res:any) => {
        this.setCurrentUser(res.current_user)
      })
    );
  }
}
