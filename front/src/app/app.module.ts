import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog'

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
import { DevWebDeleteComponent } from './Components/Home/ressourceAction/deleteRessource/dev-web-delete/dev-web-delete.component';
import { DevFrontDeleteComponent } from './Components/Home/ressourceAction/deleteRessource/dev-front-delete/dev-front-delete.component';
import { ModifyDevFrontComponent } from './Components/Home/ressourceAction/modifyRessource/modify-dev-front/modify-dev-front.component';
import { ModifyDevWebComponent } from './Components/Home/ressourceAction/modifyRessource/modify-dev-web/modify-dev-web.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectFront4Component } from './Components/Home/dev-front/projects/project-front4/project-front4.component';
import { ProjectFront5Component } from './Components/Home/dev-front/projects/project-front5/project-front5.component';
import { ProjectFront6Component } from './Components/Home/dev-front/projects/project-front6/project-front6.component';
import { ProjectFront7Component } from './Components/Home/dev-front/projects/project-front7/project-front7.component';
import { ProjectFront8Component } from './Components/Home/dev-front/projects/project-front8/project-front8.component';
import { ProjectFront9Component } from './Components/Home/dev-front/projects/project-front9/project-front9.component';
import { ProjectFront10Component } from './Components/Home/dev-front/projects/project-front10/project-front10.component';
import { ProjectFront11Component } from './Components/Home/dev-front/projects/project-front11/project-front11.component';
import { ProjectFront12Component } from './Components/Home/dev-front/projects/project-front12/project-front12.component';
import { ProjectFront13Component } from './Components/Home/dev-front/projects/project-front13/project-front13.component';
import { ProjectFront14Component } from './Components/Home/dev-front/projects/project-front14/project-front14.component';


export const ROUTES : Routes = [
  {path : 'register', component: RegisterComponent},
  {path : 'login', component: LoginComponent},
  {path : 'home', component: HomeComponent},
  {path : 'developpeur-web', component: DevComponent},
  {path : 'developpeur-frontend', component: DevFrontComponent},
  {path : 'developpeur-web/projet1', component: Project1Component},
  {path : 'developpeur-web/projet2', component: Project2Component},
  {path : 'developpeur-web/projet3', component: Project3Component},
  {path : 'developpeur-web/projet4', component: Project4Component},
  {path : 'developpeur-web/projet5', component: Project5Component},
  {path : 'developpeur-web/projet6', component: Project6Component},
  {path : 'developpeur-web/p7', component: Project7Component},
  {path : 'dev-front-p1', component: ProjectFront1Component},
  {path : 'modify-dev-web-ressource/:project/:ressourceId', component: ModifyDevWebComponent},
  {path : 'modify-dev-front-ressource/:ressourceId', component: ModifyDevFrontComponent},
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
    DevWebDeleteComponent,
    DevFrontDeleteComponent,
    ModifyDevFrontComponent,
    ModifyDevWebComponent,
    ProjectFront4Component,
    ProjectFront5Component,
    ProjectFront6Component,
    ProjectFront7Component,
    ProjectFront8Component,
    ProjectFront9Component,
    ProjectFront10Component,
    ProjectFront11Component,
    ProjectFront12Component,
    ProjectFront13Component,
    ProjectFront14Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
