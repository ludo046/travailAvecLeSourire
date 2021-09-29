import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { RessourseService } from 'src/app/Services/ressoursesService/ressourse.service';


@Component({
  selector: 'app-modify-dev-web',
  templateUrl: './modify-dev-web.component.html',
  styleUrls: ['./modify-dev-web.component.scss']
})
export class ModifyDevWebComponent implements OnInit {

  public arrowLeft = faArrowLeft;
  public file: File;
  public modifyWebRessource : FormGroup;
  public project = window.location.href.split('/')[4];
  public singleRessource : any

  constructor(private formBuilder: FormBuilder,
              private ressourceService: RessourseService) { }

  ngOnInit(): void {
    this.getOneRessource();
    this.modifyWebRessource = this.formBuilder.group({
      title : this.formBuilder.control(''),
      content : this.formBuilder.control(''),
      attachment : this.formBuilder.control('') 
    });
  }

  onFileAdded(event: Event) {
    //recuperation de la photo ou de la video ci il ya
    this.file = (event.target as HTMLInputElement).files[0];
  }

  updateDevRessource(){
      const title = this.modifyWebRessource.get('title').value;
      const content = this.modifyWebRessource.get('content').value;
      const attachment = this.modifyWebRessource.get('attachment').value;
      const ressourceId = window.location.href.split('ressource/')[1];

    this.ressourceService.updateDevRessource(title, content, attachment, ressourceId).subscribe();
  };

  getOneRessource(){
    const ressource = window.location.href.split('ressource/')[1]
    const ressourceId = ressource.split('/')[1]
    this.ressourceService.getOneRessource(ressourceId).subscribe(ressource => {
      this.singleRessource = ressource
    });
  };
}
