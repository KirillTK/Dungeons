import { AuthGuard } from './../services/auth.service';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from '../../app/landing-page/app.component';
import {ScreenPageComponent} from '../../app/screen-page/screen-page.component';
import {PlayPageComponent} from '../../app/play-page/play-page.component';


const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'screen', component: ScreenPageComponent},
  {path: 'play', component: PlayPageComponent, canActivate: [AuthGuard]}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {})
  ],
  exports: [RouterModule]
})
export class RoutingModule {

}
