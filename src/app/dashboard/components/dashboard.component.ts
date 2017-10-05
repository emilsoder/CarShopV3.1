import {Component} from '@angular/core';
import {fadeInAnimation} from "../../layout/_animations/fade-in.animation";

@Component({
  selector: 'dashboard-root',
  templateUrl: './dashboard.component.html',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
})
export class DashboardComponent {

}
