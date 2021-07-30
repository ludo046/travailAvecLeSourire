import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }
  newRequest: HttpRequest<any>;
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    if (JSON.parse(sessionStorage.getItem('session'))){
      const authToken = JSON.parse(sessionStorage.getItem('session')).token;
    
      this.newRequest = req.clone({
      withCredentials: false ,
      headers: req.headers.set('authorization', authToken)
      });
    }else{
      this.newRequest = req.clone();
    }

    return next.handle(this.newRequest);
  }
}

//intercepte chaque requette pour y injecter le headers d'autorization 