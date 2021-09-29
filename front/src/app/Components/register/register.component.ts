import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/Services/usersServise/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  errorMsg: any;
  registerSub: Subscription;

  constructor(
    private formBuilder : FormBuilder,
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: this.formBuilder.control('',[Validators.required, Validators.minLength(2)]),
      lastname: this.formBuilder.control('',[Validators.required, Validators.minLength(2)]),
      age: this.formBuilder.control('',[Validators.required,Validators.min(18)]),
      email: this.formBuilder.control('',[Validators.required, Validators.minLength(2)]),
      password: this.formBuilder.control('',[Validators.required, Validators.minLength(8)])
    })
  }
  register(){
    const formRegister = {
      firstname: this.registerForm.get('firstname').value,
      lastname: this.registerForm.get('lastname').value,
      age: this.registerForm.get('age').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
    }
    this.registerSub = this.userService.register$.subscribe(
      result => {
        if(result.message === 'ok'){
          this.router.navigate(['mail']);
        }
      },
      error => {
      this.errorMsg = error.error.message
      console.log(this.errorMsg);
      }
    )
      this.userService.register(formRegister);
  }

}
// this.router.navigate(['mail'])