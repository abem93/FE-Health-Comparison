import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/model/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  editMode: boolean = false;
  user: User | null = null

  constructor(private userService: UserService) { }


  ngOnInit(): void {
    this.userService.currentUserBehaviorSubject.subscribe((user) => {
      this.user = user
    })
  }
  currentUser() {
    console.log( this.userService.currentUserBehaviorSubject)

  }

  isEditing() {
    this.editMode = !this.editMode
  }
}
