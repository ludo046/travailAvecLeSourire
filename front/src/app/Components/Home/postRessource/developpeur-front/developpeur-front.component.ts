import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { RessourseService } from 'src/app/Services/ressoursesService/ressourse.service';

@Component({
  selector: 'app-developpeur-front',
  templateUrl: './developpeur-front.component.html',
  styleUrls: ['./developpeur-front.component.scss']
})
export class DeveloppeurFrontComponent implements OnInit {

  public arrowLeft = faArrowLeft;
  public file: File;
  public selectedFiles: File;
  public ressourceForm: FormGroup;
  public url: string;
  errorMsg: any;

  constructor(
    private formbuilder: FormBuilder,
    private ressoursesService: RessourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ressourceForm = this.formbuilder.group({
      title: this.formbuilder.control('',Validators.required),
      content: this.formbuilder.control('',Validators.required),
      attachment: this.formbuilder.control('',Validators.required),
      project: this.formbuilder.control('',Validators.required)
    })
  }

  onFileAdded(event: Event) {
    //recuperation de la photo ou de la video ci il ya
    this.file = (event.target as HTMLInputElement).files[0];
    
  }

  detectFiles(event) {
    this.file = (event.target as HTMLInputElement).files[0];
    console.log(this.file);
    
    
    this.selectedFiles = event.target.files;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    }

  postRessource():void{
    const title = this.ressourceForm.get('title').value
    const content = this.ressourceForm.get('content').value;
    const project = this.ressourceForm.get('project').value;
    const attachment = this.file;
    console.log(attachment);
    
    const parcour = window.location.href.split('/')[3]
    console.log(parcour);
    

    this.ressoursesService.postRessource(content,project,attachment,parcour,title).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['developpeur-frontend'])
      },
      error => {
      this.errorMsg = error.error.message
      console.log(this.errorMsg);
      }
    )
  }

}
