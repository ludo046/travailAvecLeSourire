import { Component, Input, OnInit } from '@angular/core';
import { RessourseService } from 'src/app/Services/ressoursesService/ressourse.service';

@Component({
  selector: 'app-dev-web-delete',
  templateUrl: './dev-web-delete.component.html',
  styleUrls: ['./dev-web-delete.component.scss']
})
export class DevWebDeleteComponent implements OnInit {

  @Input() ressourceId: number

  constructor(private ressourceService: RessourseService) { }

  ngOnInit(): void {
  }
  deleteRessourceDevWeb(){
    this.ressourceService.deleteRessourceDevWeb(this.ressourceId).subscribe(() => {
      this.ressourceService.getAllRessourcesDevWeb()
    })
  }
}
