import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogComponent} from './dialog/dialog.component';
import {Router} from '@angular/router';
import {ScoreboardService} from '../../shared/services/scoreboard/scoreboard.service';
import {TasksComponent} from './tasks/tasks.component';
import {CharacterSharedService} from '../../shared/services/character-shared.service';
import {MatDialogRef} from '@angular/material/dialog/typings/dialog-ref';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.css']
})
export class PlayPageComponent implements OnInit {

  public answer;
  public score = 0;
  public resultGame: string;
  public isRefreshSession = false;
  public isHeroAttackEnd: boolean;
  public isEnemyAttackEnd: boolean;
  private amoutOfEnemies = 0;
  private taskDialogRef: MatDialogRef<any>;

  @ViewChild('hero') hero: ElementRef;
  @Output() isContinue = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog,
              private route: Router,
              private parent: ViewContainerRef,
              private scoreboard: ScoreboardService,
              private characterSharedService: CharacterSharedService,
              public taskDialog: MatDialog) {
  }

  ngOnInit() {
    this.openTaskDialog();
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
      this.scoreboard.addUser({
        name: this.characterSharedService.getHeroName(),
        score: this.score
      }).then();

      this.openDialog({result: this.score, countEnemies: this.amoutOfEnemies});
    }

    if (result === 'win') {
      setTimeout(() => {
        this.amoutOfEnemies++;
        this.isRefreshSession = !this.isRefreshSession;
      }, 1700);
    }

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

  isFinishAnimateHeroAttack(value: boolean) {
    if (this.resultGame !== 'lose') {
      this.isHeroAttackEnd = value;
      setTimeout(() => {
        this.isHeroAttackEnd = false;
        this.openTaskDialog();
      }, 0);
    }
  }

  isFinishAnimateEnemyAttack(value: boolean) {
    this.isEnemyAttackEnd = value;
    setTimeout(() => {
      this.isEnemyAttackEnd = false;
      this.openTaskDialog();
    }, 0);
  }

  openTaskDialog() {
    Promise.resolve().then(() => {
      this.taskDialogRef = this.taskDialog.open(TasksComponent, {disableClose: true, panelClass: 'task-dialog'});
      this.taskDialogRef.afterClosed().subscribe(result => {
        this.getAnswer(result);
      });
    });

  }

}
