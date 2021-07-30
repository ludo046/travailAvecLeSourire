import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { HeaderComponent } from './Components/Header/header/header.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/Home/home/home.component';
import { DevComponent } from './Components/Home/dev/dev.component';
import { DevFrontComponent } from './Components/Home/dev-front/dev-front.component';
import { Project1Component } from './Components/Home/dev/projects/project1/project1.component';
import { Project2Component } from './Components/Home/dev/projects/project2/project2.component';
import { Project3Component } from './Components/Home/dev/projects/project3/project3.component';
import { Project4Component } from './Components/Home/dev/projects/project4/project4.component';
import { Project5Component } from './Components/Home/dev/projects/project5/project5.component';
import { Project6Component } from './Components/Home/dev/projects/project6/project6.component';
import { Project7Component } from './Components/Home/dev/projects/project7/project7.component';
import { ProjectFront1Component } from './Components/Home/dev-front/projects/project-front1/project-front1.component';
import { ProjectFront2Component } from './Components/Home/dev-front/projects/project-front2/project-front2.component';
import { ProjectFront3Component } from './Components/Home/dev-front/projects/project-front3/project-front3.component';
import { AuthInterceptor } from './auth-interceptor';


export const ROUTES : Routes = [
  {path : 'register', component: RegisterComponent},
  {path : 'login', component: LoginComponent},
  {path : 'home', component: HomeComponent},
  {path : 'developpeur-web', component: DevComponent},
  {path : 'developpeur-frontend', component: DevFrontComponent},
  {path : 'developpeur-web-p1', component: Project1Component},
  {path : 'developpeur-web-p2', component: Project2Component},
  {path : 'developpeur-web-p3', component: Project3Component},
  {path : 'developpeur-web-p4', component: Project4Component},
  {path : 'developpeur-web-p5', component: Project5Component},
  {path : 'developpeur-web-p6', component: Project6Component},
  {path : 'developpeur-web-p7', component: Project7Component},
  {path : '', component: RegisterComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    DevComponent,
    DevFrontComponent,
    Project1Component,
    Project2Component,
    Project3Component,
    Project4Component,
    Project5Component,
    Project6Component,
    Project7Component,
    ProjectFront1Component,
    ProjectFront2Component,
    ProjectFront3Component,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
