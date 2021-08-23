import { Component, OnInit } from '@angular/core';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public faHome = faHome;
  public faUser = faUser;

  constructor() { }

  ngOnInit(): void {
  }

}
