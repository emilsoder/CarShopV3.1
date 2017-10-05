import {Component} from '@angular/core';
import {CurrentUserService} from "./shared/services/currentuser.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  year: any;

  constructor(public currentUser: CurrentUserService) {
    this.year = (new Date()).getFullYear();
    this.addEventHandlers();
  }

  addEventHandlers(): void {
    $(function () {
      $("ul.nav > li").click(function () {
        $("ul.nav > li").removeClass("active");
        $(this).addClass("active");
      });
    });
  }
}
