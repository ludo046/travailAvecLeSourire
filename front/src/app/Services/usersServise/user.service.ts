import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { registerModel, loginModel } from 'src/app/Models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = environment.userUrl;
  allUsers$ = new Subject<any>();
  singleUser$ = new Subject<any>();

  constructor(
    private httpClient: HttpClient
  ) { }

  register(registerModel: registerModel){
    return this.httpClient.post(`${this.userUrl}register`, registerModel);
  }

  login(loginModel: loginModel){
    return this.httpClient.post(`${this.userUrl}login`, loginModel);
  }

  getAllUsers():void{
    this.httpClient.get(`${this.userUrl}all`).subscribe(
      (users) => {
        this.allUsers$.next(users);
      },
      (error) => {
        this.allUsers$.next([]);
        console.error(error);
      }
    )
  }

  getSingleUser():void{
    this.httpClient.get(`${this.userUrl}me`).subscribe(
      (user) => {
        this.singleUser$.next(user);
      },
      (error) => {
        this.singleUser$.next([]);
        console.log(error)
      }
    )
  }

  updateUser(firstname: string, lastname: string, email: string, age: string, password: string, picture: File){
    let formData = new FormData()
      formData.append('firstname', firstname);
      formData.append('lastname', lastname);
      formData.append('email', email);
      formData.append('age', age);
      formData.append('password', password);
      formData.append('image', picture);
      
      return this.httpClient.put(`${this.userUrl}modify`, formData)
  }
}
