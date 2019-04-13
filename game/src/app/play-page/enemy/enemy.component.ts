import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Character} from '../../../shared/model/character';
import {Path} from '../../../shared/model/Path';
import {CharacterService} from '../../../shared/services/character/character.service';
import {CharacterSharedService} from '../../../shared/services/character-shared.service';
import {DAMAGE} from '../../../shared/model/Damage';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css']
})
export class EnemyComponent implements OnInit, OnChanges {

  public enemy: Character;

  @Input() result: string;
  @Input() refreshSession: boolean;
  @Input() isHeroAttackEnd: boolean;
  @Output() gameResult = new EventEmitter<string>();
  @Output() isFinishAnimationAttack = new EventEmitter<boolean>();
  @ViewChild('enemy') enemyElement: ElementRef;


  constructor(private character: CharacterService, private characterSharedService: CharacterSharedService) {
  }

  ngOnInit() {

    this.character.getCharacterData(Path.ENEMY_PATH, 'enemy')
      .then((character: Character) => {
        this.enemy = character;
        this.characterSharedService.setEnemyName(this.enemy.name);
        this.characterSharedService.setEnemyHealth(this.enemy.health);
        this.setState();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {


    if (changes.hasOwnProperty('result') && typeof changes.result.currentValue !== 'undefined'){
      if (changes.result.currentValue.result === 'Incorrect'){
        this.attack();
      }
    }

    if (changes.hasOwnProperty('isHeroAttackEnd')){
       if (changes.isHeroAttackEnd.currentValue === true){
         this.reduceHealth(25);
       }
    }

    if (changes.hasOwnProperty('refreshSession')){
      if (changes.refreshSession.currentValue !== changes.refreshSession.previousValue){
        this.character.getCharacterData(Path.ENEMY_PATH, 'enemy')
          .then((character: Character) => {
            this.enemy = character;
            this.characterSharedService.setEnemyName(this.enemy.name);
            this.characterSharedService.setEnemyHealth(this.enemy.health);
            this.setState();
          });
      }
    }

    this.isHeroAttackEnd = false;
  }

  attack() {
    this.enemyElement.nativeElement.src = this.enemy.pathAttack;
    setTimeout(() => {
      const healthHero = this.characterSharedService.getHeroHealth();
      if (healthHero !== 0){
        this.isFinishAnimationAttack.emit(true);
      }
      this.enemyElement.nativeElement.src = this.enemy.pathCharacter;
    }, 1000);
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

  reduceHealth(amountHealth) {
    if (this.enemy.health - amountHealth === 0) {
      this.die();
      this.gameResult.emit('win');
    } else {
      this.hurt();
    }
    this.enemy.health -= amountHealth;
    this.characterSharedService.setEnemyHealth(this.enemy.health);
  }

  setState() {
    this.enemyElement.nativeElement.src = this.enemy.pathCharacter;
  }

}
