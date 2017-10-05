import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {routedComponents} from './app-routing.module';
import {GlobalState} from "./shared/observers/_global";
import {HttpService, PubSubService} from "./shared/services/services";
import {AuctionModule} from "./auction/auction.module";
import {HomeModule} from "./home/home.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {AuthenticationModule} from "./authentication/authentication.module";
import {AuthGuard} from "./shared/guards/auth.guard";
import {SharedBaseModule} from "./shared/modules/shared.base.module";
import {CurrentUserService} from "./shared/services/currentuser.service";
import {AuthorizedGuard} from "./shared/guards/authorized.guard";
import {StatusDialogComponent} from "./layout/dialog/status-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    StatusDialogComponent
  ],
  imports: [
    SharedBaseModule,
    AuctionModule,
    HomeModule,
    DashboardModule,
    AuthenticationModule,
  ],
  providers: [
    HttpService,
    PubSubService,
    GlobalState,
    AuthGuard,
    AuthorizedGuard,
    CurrentUserService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
