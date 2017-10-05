import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../services/services";


@Component({
    moduleId: this.module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
  public    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}
