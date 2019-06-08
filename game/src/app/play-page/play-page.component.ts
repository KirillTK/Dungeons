import { TasksService } from './../../shared/services/tasks/tasks.service';
import { FinishGameComponent } from './../../shared/components/finish-game/finish-game.component';
import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogComponent} from './dialog/dialog.component';
import {Router} from '@angular/router';
import {ScoreboardService} from '../../shared/services/scoreboard/scoreboard.service';
import {TasksComponent} from './tasks/tasks.component';
import {CharacterSharedService} from '../../shared/services/character-shared.service';
import {MatDialogRef} from '@angular/material/dialog/typings/dialog-ref';
import {FightService} from "../../shared/services/fight.service";
import {Observable} from "rxjs";
import { MusicSettingsComponent } from 'src/shared/components/music-settings-dialog/music-settings-dialog.component';
import { InfoDialogComponent } from 'src/shared/components/info-dialog/info-dialog.component';
import { WinGameComponent } from 'src/shared/components/win-game/win-game.component';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.css']
})
export class PlayPageComponent implements OnInit  {

  public answer;
  public score = 0;
  public resultGame: string;
  private amoutOfEnemies = 0;
  private taskDialogRef: MatDialogRef<any>;
  finishHeroAnimation$: Observable<any>;
  finishEnemyAnimation$: Observable<any>;

  @ViewChild('battlefield') battlefield: ElementRef;
  @Output() isContinue = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog,
              private route: Router,
              private scoreboard: ScoreboardService,
              private characterSharedService: CharacterSharedService,
              public taskDialog: MatDialog,
              private fight: FightService,
              private task: TasksService
  ) {
  }

  ngOnInit() {
    setTimeout(()=> this.openInfoDialog(),0);
    
    this.finishHeroAnimation$ = this.fight.finishHeroAnimation;
    this.finishEnemyAnimation$ = this.fight.finishEnemyAnimation;
  
    this.fight.renderBattlefield(this.battlefield);
  }

  getAnswer(answer) {
    this.answer = answer;
    this.setScore();
    this.resetAnswer();
  }


  resetAnswer() {
    setTimeout(() => {
      this.answer = '';
    }, 0);
  }

  setScore() {
    return this.answer.result === 'Correct' ? this.score += 100 : this.score -= 50;
  }


  getResultGame(result: string) {
    this.resultGame = result;

    if (result === 'lose') {
      this.finishGame();
    }

    if (result === 'win') {
      setTimeout(() => {
        this.amoutOfEnemies++;
        if(this.fight.isFinishLevel()) {
          const dialogRef = this.dialog.open(WinGameComponent);
          dialogRef.afterClosed().subscribe( result => {
            if(result) {
              this.task.diffucult++;
              this.fight.resetLevel();
              this.refreshGame();
            } else {
              this.finishGame();
            }
          });
        } else {
          this.refreshGame();
        }
        
      }, 1700);
    }
  }

  refreshGame() {
    this.fight.nextLevel(this.battlefield);
    this.fight.refreshSession();
  }

  finishGame() {
    this.scoreboard.addUser({
      name: this.characterSharedService.getHeroName(),
      score: this.score
    }).then();

    this.openDialog({result: this.score, countEnemies: this.amoutOfEnemies});
  }

  openTaskDialog() {
    Promise.resolve().then(() => {
      this.taskDialogRef = this.taskDialog.open(TasksComponent, {disableClose: true, panelClass: 'task-dialog'});
      this.taskDialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('result', result);
          this.fight.setGameResult(result);
          this.getAnswer(result);
        }
      });
    });
  }

  openDialog(data) {
    Promise.resolve().then(() => {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: data,
        disableClose: true,
        panelClass: 'lose-dialog'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.route.navigate(['/']);
      });
    });
  }

  openMusicSettingsDialog() {
    this.dialog.open(MusicSettingsComponent, {
      height: '420px',
      width: '450px',
    });
  }

  onFinishGame() {
    const dialogRef = this.dialog.open(FinishGameComponent, {data: this.characterSharedService.getHeroName()});
    dialogRef.afterClosed().subscribe( result=> {
      if(result) {
        this.finishGame();
      }
    });
  }

  openInfoDialog() {
    this.dialog.open(InfoDialogComponent, {
      height: '600px',
      width: '800px'
    });
  }

}
