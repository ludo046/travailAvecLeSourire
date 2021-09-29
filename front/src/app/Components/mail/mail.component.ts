import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/Services/usersServise/user.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {

  public code : FormGroup;
  userSub: Subscription;
  User: any
  errorMsg

  form: any;
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'] ;
  @ViewChildren('formRow') rows: any;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { 
                this.form = this.toFormGroup(this.formInput)
              }

  ngOnInit(): void {
    // this.code = this.formBuilder.group({
    //   inputOne: this.formBuilder.control('',[Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
    //   inputTwo: this.formBuilder.control('',[Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
    //   inputThree: this.formBuilder.control('',[Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
    //   inputFour: this.formBuilder.control('',[Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
    //   inputFive: this.formBuilder.control('',[Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
    //   inputSix: this.formBuilder.control('',[Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
    // })


  }
  toFormGroup(elements){
    const group: any = {};
    elements.forEach(key => {
      group[key] = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)])
    });
    return new FormGroup(group)
  }

  keyUpEvent(event, index){
    let pos = index;
    if(event.keyCode === 8 && event.which === 8){
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if(pos > -1 && pos < this.formInput.length){
      this.rows._results[pos].nativeElement.focus()
    }
  }

  codeValidation():void{

    const inputOne = this.form.get('input1').value;
    const inputTwo = this.form.get('input2').value;
    const inputThree = this.form.get('input3').value;
    const inputFour = this.form.get('input4').value;
    const inputFive = this.form.get('input5').value;
    const inputSix = this.form.get('input6').value;

     const code = `${inputOne}${inputTwo}${inputThree}${inputFour}${inputFive}${inputSix}`
     console.log(code);
     

    this.userSub = this.userService.userConnection$.subscribe(
      (user) => {
        console.log(user);
        
        if(user.activate === true){
          sessionStorage[`session`] = JSON.stringify(user),
          this.router.navigate(['login']);
        }
      },
      (error) => {
        this.errorMsg = JSON.stringify(error)
      }
    );

    this.userService.tokenValidation(code);
  }
}
