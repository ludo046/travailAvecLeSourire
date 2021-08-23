import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/usersServise/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: this.formBuilder.control('',[Validators.required, Validators.minLength(2)]),
      lastname: this.formBuilder.control('',[Validators.required, Validators.minLength(2)]),
      age: this.formBuilder.control('18',[Validators.required,Validators.min(18)]),
      email: this.formBuilder.control('',[Validators.required, Validators.minLength(2)]),
      password: this.formBuilder.control('',[Validators.required, Validators.minLength(8)])
    })
  }
  register():void{
    const formRegister = {
      firstname: this.registerForm.get('firstname').value,
      lastname: this.registerForm.get('lastname').value,
      age: this.registerForm.get('age').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value
    }
    this.userService.register(formRegister).subscribe(result => {
      sessionStorage[`session`] = JSON.stringify(result)
      this.router.navigate['/home']
    })
  }

}
