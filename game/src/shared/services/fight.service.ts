import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

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

}
