import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedBaseModule} from "../shared/modules/shared.base.module";
import {SalesService} from "./services/sales.service";
import {EJAngular2Module} from "ej-angular2";
import {SalesGridComponent} from './components/grid/sales-grid.component';
import {FilterComponent} from './components/filter/filter.component';
import {SalesMainComponent} from './components/sales-main/sales-main.component';
import {GlobalState} from "../shared/observers/_global";

@NgModule({
  imports: [
    CommonModule,
    SharedBaseModule,
    EJAngular2Module.forRoot()
  ],
  declarations: [
    SalesGridComponent,
    FilterComponent,
    SalesMainComponent
  ],
  exports: [
    SalesMainComponent
  ],
  providers: [
    SalesService,
    GlobalState
  ]
})
export class SalesModule {
}
