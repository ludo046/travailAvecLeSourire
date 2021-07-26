import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project7',
  templateUrl: './project7.component.html',
  styleUrls: ['./project7.component.scss']
})
export class Project7Component implements OnInit {

  public arrowLeft = faArrowLeft;

  constructor() { }

  ngOnInit(): void {
  }

}
