import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/usersServise/user.service';

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.scss']
})
export class ModifyProfileComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  file: File;
  updateUserForm: FormGroup;
  errorMsg: any;

  ngOnInit(): void {
    this.updateUserForm = this.formBuilder.group({
      firstname: this.formBuilder.control('', [Validators.minLength(2)]),
      lastname: this.formBuilder.control('', [Validators.minLength(2)]),
      email: this.formBuilder.control('', [Validators.minLength(5), Validators.email]),
      age: this.formBuilder.control('', [Validators.min(18)]),
      password: this.formBuilder.control('', [Validators.minLength(8)]),
      picture: this.formBuilder.control('')
    })
  }

  updateUser(){
    const firstname = this.updateUserForm.get('firstname').value;
    const lastname = this.updateUserForm.get('lastname').value;
    const email = this.updateUserForm.get('email').value;
    const age = this.updateUserForm.get('age').value;
    const password = this.updateUserForm.get('password').value;
    const picture  = this.file;
    
    this.userService.updateUser(firstname, lastname, email, age, password, picture).subscribe(
      result => {
        console.log(result);
        this.errorMsg = result
        this.router.navigate(['profile'])
      },
      error => {
      this.errorMsg = error.error.message
      console.log(this.errorMsg);
      }
    )
  }


  onFileAdded(event: Event) {
    //recuperation de la photo ou de la video ci il ya
    this.file = (event.target as HTMLInputElement).files[0];
  }
}
