import { FightService } from './../../../shared/services/fight.service';
import {
  ChangeDetectorRef,
  Component, ElementRef,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {CharacterSharedService} from '../../../shared/services/character-shared.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit, AfterViewInit {

  @ViewChild('heroHealth') heroHealth: ElementRef;
  @ViewChild('enemyHealth') enemyHealth: ElementRef;
  private _heroHealth: number;
  private _enemyHealth: number;

  @Input() score: number;

  @ViewChild('enemyName') enemyName: ElementRef;
  @ViewChild('heroName') heroName: ElementRef;

  @ViewChild('heroHP') heroHP: ElementRef;

  @ViewChild('enemyHP') enemyHP: ElementRef;

  finishHeroAnimation$: Observable<any>;
  finishEnemyAnimation$: Observable<any>;
  refreshSession$: Observable<any>;


  constructor(private cd: ChangeDetectorRef, private characterSharedService: CharacterSharedService, private fight: FightService) {
  }

  ngOnInit() {
    this.finishHeroAnimation$ = this.fight.finishHeroAnimation;
    this.finishEnemyAnimation$ = this.fight.finishEnemyAnimation;
    this.refreshSession$ = this.fight.refreshSession$;

    this.finishHeroAnimation$.subscribe(()=>{
        setTimeout(()=>this.renderHP(),0)
    });

    this.finishEnemyAnimation$.subscribe(()=>{
        setTimeout(()=>this.renderHP(),0)
    });

    this.refreshSession$.subscribe(()=>{
      setTimeout(()=>this.renderHP(),0)
    })

  }

  ngAfterViewInit() {
    this.renderHP();
  }

  private renderHP() {
    this._enemyHealth = this.characterSharedService.getEnemyHealth();
    this.enemyHealth.nativeElement.innerText = this._enemyHealth + ' / 100';

    this._heroHealth = this.characterSharedService.getHeroHealth();
    this.heroHealth.nativeElement.innerText = this._heroHealth + ' / 100';

    this.enemyName.nativeElement.innerText = this.characterSharedService.getEnemyName();
    this.heroName.nativeElement.innerText = this.characterSharedService.getHeroName();

    this.calculateHero(this._heroHealth, this.heroHP);
    this.calculateHero(this._enemyHealth, this.enemyHP);

  }

  calculateHero(health: number, hpElement: ElementRef): void {
    const characterHealth = health;

    if (characterHealth === 100) {
      hpElement.nativeElement.style.width = '100%';
      return;
    }
    
    if (characterHealth < 0) {
      hpElement.nativeElement.style.width = '0%';
      return;
    }

    if (characterHealth < 100) {
      hpElement.nativeElement.style.width = characterHealth + '%';
      return;
    }
  }

}
