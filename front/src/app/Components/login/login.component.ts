import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/usersServise/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('',[Validators.required, Validators.minLength(2)]),
      password: this.formBuilder.control('',[Validators.required, Validators.minLength(2)])
    })
  }

  login():void{
    const formLogin = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    this.userService.login(formLogin).subscribe(result => {
      sessionStorage[`session`] = JSON.stringify(result);
    })
    this.userService.login(formLogin).subscribe(() => this.router.navigate(['home']));
  }

}
