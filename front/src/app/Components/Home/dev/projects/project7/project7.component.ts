import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Ressources } from 'src/app/Models/ressource.model';
import { RessourseService } from 'src/app/Services/ressoursesService/ressourse.service';

@Component({
  selector: 'app-project7',
  templateUrl: './project7.component.html',
  styleUrls: ['./project7.component.scss']
})
export class Project7Component implements OnInit {

  public arrowLeft = faArrowLeft;
  ressourcesSub: Subscription;
  ressources: Ressources[];
  errorMsg


  constructor(
    private ressourceService: RessourseService
  ) { }

  ngOnInit(): void {
    this.ressourcesSub = this.ressourceService.allRessources$.subscribe(
      (ressources) => {
        this.ressources = ressources;
        console.log(this.ressources);
        
      },
      (error) => {
        console.log(error);
        this.errorMsg = JSON.stringify(error);
      }
    );
    this.ressourceService.getAllRessources()
  }


}
