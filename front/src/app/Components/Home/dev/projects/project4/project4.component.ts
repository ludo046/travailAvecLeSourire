import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Ressources } from 'src/app/Models/ressource.model';
import { RessourseService } from 'src/app/Services/ressoursesService/ressourse.service';

@Component({
  selector: 'app-project4',
  templateUrl: './project4.component.html',
  styleUrls: ['./project4.component.scss']
})
export class Project4Component implements OnInit {

  public arrowLeft = faArrowLeft;
  ressourcesSub: Subscription;
  ressources: Ressources[];
  errorMsg
  public connectUserId = JSON.parse(sessionStorage.getItem('session')).userId;


  constructor(
    private ressourceService: RessourseService
  ) { }

  ngOnInit(): void {
    this.ressourcesSub = this.ressourceService.allRessourcesDevWeb$.subscribe(
      (ressources) => {
        this.ressources = ressources.filter(ressources => ressources.project === 'projet4');
        
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
      }
    );
    this.ressourceService.getAllRessourcesDevWeb()
  }

}
