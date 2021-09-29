import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SingleUser, Users } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/usersServise/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  userSub: Subscription;
  User: SingleUser;
  errorMsg;
  fullPathname = 'assets/images/userPicture.png'

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userSub = this.userService.singleUser$.subscribe(
      (user) => {
        this.User = user
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
      }
    );
    this.userService.getSingleUser()
  }

}
