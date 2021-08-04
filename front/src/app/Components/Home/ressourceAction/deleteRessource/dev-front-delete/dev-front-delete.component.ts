import { Component, Input, OnInit } from '@angular/core';
import { RessourseService } from 'src/app/Services/ressoursesService/ressourse.service';

@Component({
  selector: 'app-dev-front-delete',
  templateUrl: './dev-front-delete.component.html',
  styleUrls: ['./dev-front-delete.component.scss']
})
export class DevFrontDeleteComponent implements OnInit {

  @Input() ressourceId: number

  constructor(private ressourceService: RessourseService) { }

  ngOnInit(): void {
  }
  deleteRessourceDevFront(){
    
    this.ressourceService.deleteRessourceDevFront(this.ressourceId).subscribe(() => {
      this.ressourceService.getAllRessourcesDevFront()
    })
  }

}
