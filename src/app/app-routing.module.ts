import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuctionMainComponent} from "./auction/components/auction-main/auction-main.component";
import {AuctionDetailsComponent} from "./auction/components/auction-details/auction-details.component";
import {LoginComponent} from "./authentication/components/login/login.component";
import {RegisterComponent} from "./authentication/components/register/register.component";
import {DashboardComponent} from "./dashboard/components/dashboard.component";
import {AuthorizedGuard} from "./shared/guards/authorized.guard";
import {HomeComponent} from "./home/components/home/home.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: '', component: HomeComponent},
  {
    path: 'auctions', component: AuctionMainComponent,
    children: [
      {
        path: 'details/:id',
        component: AuctionDetailsComponent
      },
    ]
  },
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthorizedGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

export const routedComponents = [];




