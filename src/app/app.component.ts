import {Component} from '@angular/core';
import * as _ from "lodash";
import * as $ from "jquery";
import {} from "bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  year: any;

  constructor() {
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
