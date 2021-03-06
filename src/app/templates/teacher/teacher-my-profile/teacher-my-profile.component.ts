import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import User from "src/app/interfaces/user.model";
import { AuthService } from "src/app/pages/auth/auth.service";
import { UsersService } from "src/app/pages/users/users.service";


@Component({
  selector: 'app-teacher-my-profile',
  templateUrl: './teacher-my-profile.component.html',
  styleUrls: ['./teacher-my-profile.component.scss']
})
export class TeacherMyProfileComponent implements OnInit {
  private authListenerSubs = new Subscription();
  isAuthenticated = false;
  userAuth: User;
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  async ngOnInit() {
    this.isAuthenticated = this.authService.isAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });
    if (this.isAuthenticated) {
      const { userId } = this.authService.getAuthStatus();
      this.userAuth = await this.usersService.getUserById(userId);
    }
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
