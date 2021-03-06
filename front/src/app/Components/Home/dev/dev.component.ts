import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { RessourseService } from 'src/app/Services/ressoursesService/ressourse.service';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss']
})
export class DevComponent implements OnInit {

  public arrowLeft = faArrowLeft;
  public file: File;
  public ressourceForm: FormGroup;
  public allRessources = new BehaviorSubject([]);
  errorMsg: any;

  constructor(
    private formbuilder: FormBuilder,
    private ressoursesService: RessourseService
  ) { }

  ngOnInit(): void {
    //this.getAllRessources()
    this.ressourceForm = this.formbuilder.group({
      title: this.formbuilder.control('',Validators.required),
      content: this.formbuilder.control('',Validators.required),
      attachment: this.formbuilder.control('',Validators.required),
      project: this.formbuilder.control('',Validators.required),
    })
  }

  onFileAdded(event: Event) {
    //recuperation de la photo ou de la video ci il ya
    this.file = (event.target as HTMLInputElement).files[0];
    
  }

  postRessource():void{
    const title = this.ressourceForm.get('title').value;
    const content = this.ressourceForm.get('content').value;
    const project = this.ressourceForm.get('project').value;
    const attachment = this.file;
    const parcours = window.location.href.split('/')[3]
    
    

    this.ressoursesService.postRessource(content,project,attachment,parcours,title).subscribe(
      result => {
        console.log(result);
        this.errorMsg = result
      },
      error => {
      this.errorMsg = error.error.message
      console.log(this.errorMsg);
      }
    )
  }
}
