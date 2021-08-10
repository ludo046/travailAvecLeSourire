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
}
