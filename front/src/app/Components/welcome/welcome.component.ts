import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/Services/usersServise/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  userSub: Subscription;
  User: any
  errorMsg

  constructor(private userService : UserService,
              private router : Router) { }

  ngOnInit(): void {
    // const url = window.location.href.split('welcome/')[1]
    // localStorage.setItem[`session`] = JSON.stringify(url)  
  
  }

  tokenValidation():void{
    const url = window.location.href.split('welcome/')[1]

    this.userSub = this.userService.userConnection$.subscribe(
      (user) => {
        if(user.connection === true){
          sessionStorage[`session`] = JSON.stringify(user),
          this.router.navigate(['login']);
        }
      },
      (error) => {
        this.errorMsg = JSON.stringify(error)
      }
    );
    this.userService.tokenValidation(url)
  }

}
