import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Ressources } from 'src/app/Models/ressource.model';
import { RessourseService } from 'src/app/Services/ressoursesService/ressourse.service';

@Component({
  selector: 'app-get-one-ressource',
  templateUrl: './get-one-ressource.component.html',
  styleUrls: ['./get-one-ressource.component.scss']
})
export class GetOneRessourceComponent implements OnInit {


  public arrowLeft = faArrowLeft;
  ressourceSub: Subscription;
  ressource: Ressources;
  errorMsg
  public connectUserId = JSON.parse(sessionStorage.getItem('session')).userId;


  constructor(
    private ressourceService: RessourseService,
  ) { }

  ngOnInit(): void {
    const ressourceId = window.location.href.split('/')[6];
    
    this.ressourceSub = this.ressourceService.singleRessource$.subscribe(
      (ressource) => {
        this.ressource = ressource;
        console.log(this.ressource);
        
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
        console.log(this.errorMsg);
        
      }
    );
    this.ressourceService.getSingleRessource(ressourceId)
  }



  

}
