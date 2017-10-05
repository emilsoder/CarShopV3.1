import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from "./components/add/add.component";
import {UpdateComponent} from "./components/update/update.component";
import {ManageService} from "./services/manage.service";
import {SharedBaseModule} from "../shared/modules/shared.base.module";
import {LocalstorageService} from "../shared/services/localstorage.service";
import {HttpService} from "../shared/services/http.service";
import {AutocompletePipe} from './pipes/autocomplete.pipe';
import {MakesPipe} from "./pipes/makespipe.pipe";
import {CurrentUserService} from "../shared/services/currentuser.service";
import {EJAngular2Module} from "ej-angular2";
import {UpdateDialogComponent} from './components/update-dialog/update-dialog.component';
import {StatusDialogComponent} from '../layout/dialog/status-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedBaseModule,
    EJAngular2Module
  ],
  exports: [
    UpdateComponent,
    AddComponent
  ],
  declarations: [
    AddComponent,
    UpdateComponent,
    AutocompletePipe,
    MakesPipe,
    UpdateDialogComponent
  ],
  providers: [
    ManageService,
    LocalstorageService,
    HttpService,
    CurrentUserService
  ],
  entryComponents: [
    UpdateDialogComponent,
    StatusDialogComponent
  ]
})

export class ManageModule {
}
