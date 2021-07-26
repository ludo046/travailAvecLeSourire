import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project2',
  templateUrl: './project2.component.html',
  styleUrls: ['./project2.component.scss']
})
export class Project2Component implements OnInit {

  public arrowLeft = faArrowLeft;

  constructor() { }

  ngOnInit(): void {
  }

}
