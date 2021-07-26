import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project3',
  templateUrl: './project3.component.html',
  styleUrls: ['./project3.component.scss']
})
export class Project3Component implements OnInit {

  public arrowLeft = faArrowLeft;

  constructor() { }

  ngOnInit(): void {
  }

}
