import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./components/dashboard.component";
import {BrowserModule} from "@angular/platform-browser";
import {SharedBaseModule} from "../shared/modules/shared.base.module";
import {SalesModule} from "../sales/sales.module";
import {ManageModule} from "../manage/manage.module";

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedBaseModule,
    SalesModule,
    ManageModule
  ],
  exports: [
    DashboardComponent
  ],
  providers: []
})
export class DashboardModule {
}
