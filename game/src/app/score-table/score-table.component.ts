import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/model/User';
import {ScoreboardService} from '../../shared/services/scoreboard/scoreboard.service';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent implements OnInit {

  public isLoaded = false;
  public players: User[] = [];


  constructor(private scoreboard: ScoreboardService) {
  }

  ngOnInit() {
    this.scoreboard.getScoreboard()
      .subscribe(users => {
        this.players = users.sort( (a,b) => b.score - a.score);
        this.isLoaded = true;
      });
  }
}
