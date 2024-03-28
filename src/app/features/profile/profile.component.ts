import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/model/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  user: User = new User({});
  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getBootstrapData().subscribe((res:any) => {
      this.user = res.current_user
    })
    console.log(this.user)
  }
  currentUser() {
    console.log( this.userService.currentUserBehaviorSubject)

  }
}
