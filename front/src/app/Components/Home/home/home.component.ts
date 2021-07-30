import { Component} from '@angular/core';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  public powerOf = faPowerOff;

  disconnect():void{
    sessionStorage.clear()
  }
}
