import {Component} from '@angular/core';
import {fadeInAnimation} from '../../../layout/_animations/animations';

@Component({
  moduleId: module.id.toString(),
  templateUrl: './home.component.html',
  animations: [fadeInAnimation],
  styleUrls: ["./home.component.css"],
  host: {'[@fadeInAnimation]': ''}
})

export class HomeComponent {
}
