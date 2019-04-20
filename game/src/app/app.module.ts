import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {LandingComponent} from './landing-page/app.component';
import {RoutingModule} from '../shared/modules/routing.module';
import {ScreenPageComponent} from './screen-page/screen-page.component';
import {PlayPageComponent} from './play-page/play-page.component';
import {ApplicationPageComponent} from './application-page/application-page.component';
import {HeroComponent} from './play-page/hero/hero.component';
import {EnemyComponent} from './play-page/enemy/enemy.component';
import {BarComponent} from './play-page/bar/bar.component';
import {TasksService} from '../shared/services/tasks/tasks.service';
import {CharacterService} from '../shared/services/character/character.service';
import {TasksComponent} from './play-page/tasks/tasks.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../shared/modules/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogComponent} from './play-page/dialog/dialog.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {ScoreboardService} from '../shared/services/scoreboard/scoreboard.service';
import {RegisterDialogComponent} from './landing-page/register-dialog/register-dialog.component';
import { ScoreTableComponent } from './score-table/score-table.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FocusDirective} from '../shared/directive/FocusDirective';
import 'hammerjs';
import {SlideshowModule} from "ng-simple-slideshow";
import {CharacterSharedService} from "../shared/services/character-shared.service";
import {MusicSettingsComponent} from '../shared/components/music-settings-dialog/music-settings-dialog.component';


@NgModule({
  declarations: [
    LandingComponent,
    ScreenPageComponent,
    PlayPageComponent,
    ApplicationPageComponent,
    HeroComponent,
    EnemyComponent,
    BarComponent,
    TasksComponent,
    DialogComponent,
    RegisterDialogComponent,
    ScoreTableComponent,
    FocusDirective,
    MusicSettingsComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'Dungeons'),
    AngularFirestoreModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    SlideshowModule
  ],
  providers: [TasksService, CharacterService, ScoreboardService, CharacterSharedService],
  bootstrap: [ApplicationPageComponent],
  entryComponents: [
    DialogComponent,
    RegisterDialogComponent,
    TasksComponent
  ]
})
export class AppModule {
}
