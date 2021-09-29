import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modify-dev-front',
  templateUrl: './modify-dev-front.component.html',
  styleUrls: ['./modify-dev-front.component.scss']
})
export class ModifyDevFrontComponent implements OnInit {

  public arrowLeft = faArrowLeft;
  public file: File;

  constructor() { }

  ngOnInit(): void {
  }

  onFileAdded(event: Event) {
    //recuperation de la photo ou de la video ci il ya
    this.file = (event.target as HTMLInputElement).files[0];
    
  }

}
