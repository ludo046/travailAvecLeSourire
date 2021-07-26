import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project5',
  templateUrl: './project5.component.html',
  styleUrls: ['./project5.component.scss']
})
export class Project5Component implements OnInit {

  public arrowLeft = faArrowLeft;

  constructor() { }

  ngOnInit(): void {
  }

}
