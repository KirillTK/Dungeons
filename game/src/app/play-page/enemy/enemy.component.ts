import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Character} from '../../../shared/model/character';
import {Path} from '../../../shared/model/Path';
import {CharacterService} from '../../../shared/services/character/character.service';
import {CharacterSharedService} from '../../../shared/services/character-shared.service';
import {FightService} from "../../../shared/services/fight.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css']
})
export class EnemyComponent implements OnInit, OnDestroy {

  public enemy: Character;

  @Output() gameResult = new EventEmitter<string>();
  @ViewChild('enemy') enemyElement: ElementRef;
  private subscriptions : Subscription[] = [];
  fight$: Observable<any>;
  finishHeroAnimation$: Observable<any>;
  refreshSession$: Observable<any>;
  damageSpell: number;


  constructor(private character: CharacterService, private characterSharedService: CharacterSharedService, private fight: FightService) {
  }

  ngOnInit() {

    this.setEnemy();

    this.fight$ = this.fight.gameResult;
    this.finishHeroAnimation$ = this.fight.finishHeroAnimation;
    this.refreshSession$ = this.fight.refreshSession$;

    this.subscriptions.push(this.fight$.subscribe( (result)=>{

      this.damageSpell = result.damage;

      if (result.result === 'Incorrect'){
        this.attack();
      }
    }));

    this.subscriptions.push(this.finishHeroAnimation$.subscribe( ()=>{
      this.reduceHealth(this.damageSpell);
    }));

    this.subscriptions.push(this.refreshSession$.subscribe(()=>{
      this.setEnemy();
    }))

  }

  setEnemy() {
    this.enemy = Object.assign({}, this.character.getRandomEnemy());
    this.characterSharedService.setEnemyName(this.enemy.name);
    this.characterSharedService.setEnemyHealth(this.enemy.health);
    this.setState();
  }

  attack() {

   this.goStraight(()=> {
    this.animateAttack();
   });
  
  }

  animateAttack() {
    this.enemyElement.nativeElement.src = this.enemy.pathAttack;
    setTimeout(() => {
    const healthHero = this.characterSharedService.getHeroHealth();
    if (healthHero !== 0){
      this.fight.setFinishEnemyAnimation(true);
    }
      this.enemyElement.nativeElement.src = this.enemy.pathCharacter;
      this.goBack();
    }, 1000); 
  }

  goBack(){
    this.enemyElement.nativeElement.src = this.enemy.pathWalkBack;
    const diff = 0;
    let margin = 500;

    const time = setInterval(()=> {
      if(diff === margin) {
        clearInterval(time);
        this.enemyElement.nativeElement.src = this.enemy.pathCharacter;
      }
      this.enemyElement.nativeElement.style.marginRight = margin + 'px';
      margin -= 1;
    })
  }

  goStraight(attack) {

    this.enemyElement.nativeElement.src = this.enemy.pathWalkStraight;

    const diff = 500;
    let margin = 0;

    const time = setInterval(()=> {
      if(diff === margin) {
        clearInterval(time);
        attack();
      }
      this.enemyElement.nativeElement.style.marginRight = margin + 'px';
      margin += 1;
    })
  }

  die() {
    this.enemyElement.nativeElement.src = this.enemy.pathDeath;
  }

  hurt() {
    this.enemyElement.nativeElement.src = this.enemy.pathHeat;
    setTimeout(() => {
      this.enemyElement.nativeElement.src = this.enemy.pathCharacter;
    }, 1000);
  }

  imgLoaded(imgElement) {
    return imgElement.complete && imgElement.naturalHeight !== 0;
  }

  reduceHealth(amountHealth) {
    if (this.enemy.health - amountHealth <= 0) {
      this.die();
      setTimeout(()=> {
        this.gameResult.emit('win');
        this.enemyElement.nativeElement.style.display = 'none';
      }, 1500);
    } else {
      this.hurt();
    }
    this.enemy.health -= amountHealth;
    this.characterSharedService.setEnemyHealth(this.enemy.health);
  }

  setState() {
    this.enemyElement.nativeElement.style.display = 'block';
    this.enemyElement.nativeElement.src = this.enemy.pathCharacter;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
