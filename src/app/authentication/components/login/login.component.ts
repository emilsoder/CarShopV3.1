import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from "../../services/services";
import {LocalstorageService} from "../../../shared/services/localstorage.service";

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  public model: any = {};
   public returnUrl: string;
  public isError: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private storageService: LocalstorageService) {
  }

  ngOnInit() {
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public login() {
    this.storageService.clearData("currentUser")
     this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          this.isError = false;

        },
        error => {
          this.isError = true;
        });
  }
}
