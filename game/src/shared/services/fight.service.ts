import {Injectable, ElementRef} from '@angular/core';
import {Subject} from 'rxjs';
import { LEVEL } from '../model/levels';

@Injectable({
  providedIn: 'root'
})
export class FightService {

  private _gameResult: Subject<any> = new Subject<any>();
  private _finishHeroAnimation: Subject<any> = new Subject<any>();
  private _finishEnemyAnimation: Subject<any> = new Subject<any>();

  gameResult = this._gameResult.asObservable();
  finishHeroAnimation = this._finishHeroAnimation.asObservable();
  finishEnemyAnimation = this._finishEnemyAnimation.asObservable();

  private level = 0;

  constructor() {
  }

  setGameResult(result: any): void {
    this._gameResult.next(result);
  }

  setFinishHeroAnimation(isFinish): void {
    this._finishHeroAnimation.next(isFinish);
  }

  setFinishEnemyAnimation(isFinish): void {
    this._finishEnemyAnimation.next(isFinish);
  }

  getLevelIndex(): number {
    return  this.level > LEVEL.length ? this.level = 1 : this.level;
  }

  getBattlefiedPath(): string {
    console.log(this.level);
    return LEVEL[this.getLevelIndex()];
  }

  renderBattlefield(battlefield: ElementRef): void {
    console.log(battlefield, `"url('${this.getBattlefiedPath()}')"`);
    battlefield.nativeElement.style.backgroundImage = `url('${this.getBattlefiedPath()}')`;
  }

}
