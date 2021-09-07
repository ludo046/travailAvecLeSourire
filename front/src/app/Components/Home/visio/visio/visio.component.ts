import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-visio',
  templateUrl: './visio.component.html',
  styleUrls: ['./visio.component.scss']
})
export class VisioComponent implements OnInit {

  public arrowLeft = faArrowLeft;

  constructor() { }

  ngOnInit(): void {
  }

}
