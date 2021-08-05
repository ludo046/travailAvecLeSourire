import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Ressources } from 'src/app/Models/ressource.model';
import { RessourseService } from 'src/app/Services/ressoursesService/ressourse.service';

@Component({
  selector: 'app-project-front11',
  templateUrl: './project-front11.component.html',
  styleUrls: ['./project-front11.component.scss']
})
export class ProjectFront11Component implements OnInit {

  public arrowLeft = faArrowLeft;
  ressourcesSub: Subscription;
  ressources: Ressources[];
  errorMsg
  public connectUserId = JSON.parse(sessionStorage.getItem('session')).userId;
  front = 'developpeur-frontend'

  constructor(
    private ressourceService: RessourseService
  ) { }

  ngOnInit(): void {
    this.ressourcesSub = this.ressourceService.allRessourcesDevFront$.subscribe(
      (ressources) => {
        this.ressources = ressources.filter(ressources => ressources.project === 'projet1');
        console.log(this.ressources);
        
      },
      (error) => {
        console.log(error);
        this.errorMsg = JSON.stringify(error);
      }
    );
    this.ressourceService.getAllRessourcesDevFront()
  }
}
