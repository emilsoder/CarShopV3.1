import {NgModule} from '@angular/core';

import {
  AuctionFilterComponent,
  AuctionListComponent,
  AuctionFilterHeaderComponent,
  AuctionMainComponent,
  AuctionDetailsComponent
} from "./components/components";

import {
  AuctionService,
  ImageService,
  AuctionFilterService
} from "./services/services"

import {
  FindImagePipe,
  AuctionFilterPipe,
} from "./pipes/pipes"

import {OrderByPipe} from "../shared/pipes/pipes";
import {GlobalState} from "../shared/observers/_global";
import {PubSubService, HttpService} from "../shared/services/services";
import {SharedBaseModule} from "../shared/modules/shared.base.module";
import {LocalstorageService} from "../shared/services/localstorage.service";
import {BrandsPipe} from './pipes/brands.pipe';
import {BidService} from "./services/bid.service";
import {EJAngular2Module} from "ej-angular2";
import {StatusDialogComponent} from "../layout/dialog/status-dialog.component";
import {LoginDialogComponent} from "../authentication/components/login-dialog/login-dialog.component";

@NgModule({
  declarations: [
    AuctionFilterPipe,
    FindImagePipe,
    OrderByPipe,
    BrandsPipe,

    AuctionFilterComponent,
    AuctionListComponent,
    AuctionFilterHeaderComponent,
    AuctionDetailsComponent,
    AuctionMainComponent,
  ],
  imports: [
    SharedBaseModule,
    EJAngular2Module,
  ],
  providers: [
    HttpService,
    ImageService,
    AuctionFilterService,
    AuctionService,
    PubSubService,
    GlobalState,
    LocalstorageService,
    BidService
  ],
  exports: [
    AuctionFilterComponent,
    AuctionListComponent,
    AuctionFilterHeaderComponent,
    AuctionDetailsComponent,
    AuctionMainComponent,
  ],
  entryComponents: [
    StatusDialogComponent,
    LoginDialogComponent
  ]
})

export class AuctionModule {
}
