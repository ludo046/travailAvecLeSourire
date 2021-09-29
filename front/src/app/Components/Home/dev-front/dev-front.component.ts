import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dev-front',
  templateUrl: './dev-front.component.html',
  styleUrls: ['./dev-front.component.scss']
})
export class DevFrontComponent {

  public arrowLeft = faArrowLeft;
}
