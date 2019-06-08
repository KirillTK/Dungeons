import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {CharacterService} from '../../../shared/services/character/character.service';
import {Character} from '../../../shared/model/character';
import {CharacterSharedService} from '../../../shared/services/character-shared.service';
import {SoundService} from '../../../shared/services/sound/sound.service';
import {Observable} from "rxjs";
import {FightService} from "../../../shared/services/fight.service";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  public hero: Character;
  private castPath: string;
  @Output() gameResult = new EventEmitter<string>();
  @ViewChild('hero') heroElement: ElementRef;

  fight$: Observable<any>;
  finishEnemyAnimation$: Observable<any>;
  damageSpell: number;

  constructor(private character: CharacterService, private characterSharedService: CharacterSharedService, private soundSpell: SoundService, private fight: FightService) {
  }

  ngOnInit() {
    this.hero = this.character.getUserCharacter();
    this.characterSharedService.setHeroHealth(this.hero.health);
    this.heroElement.nativeElement.src = this.hero.pathCharacter;

    this.fight$ = this.fight.gameResult;
    this.finishEnemyAnimation$ = this.fight.finishEnemyAnimation;

    this.fight$.subscribe((result) => {

      this.damageSpell = result.damage;

      if (result.result === 'Correct') {
        const spellSound = result.castSound;
        this.castPath = result.castPath;
        this.attack(spellSound);
      }

    });

    this.finishEnemyAnimation$.subscribe( ()=>{
      this.reduceHealth(this.damageSpell);
    });
  }

  attack(spellSound: string) {
    this.heroElement.nativeElement.src = this.hero.pathAttack;
    setTimeout(() => {
      this.onAttack(spellSound);
      this.heroElement.nativeElement.src = this.hero.pathCharacter;
    }, 1000);
  }

  die() {
    this.heroElement.nativeElement.src = this.hero.pathDeath;
  }

  hurt() {
    this.heroElement.nativeElement.src = this.hero.pathHeat;
    setTimeout(() => {
      this.heroElement.nativeElement.src = this.hero.pathCharacter;
    }, 1000);
  }

  reduceHealth(amountHealth) {
    if (this.hero.health - amountHealth <= 0) {
      this.die();
      this.gameResult.emit('lose');
    } else {
      this.hurt();
    }
    this.hero.health -= amountHealth;
    this.characterSharedService.setHeroHealth(this.hero.health);
  }

  onAttack(spellSound: string) {
    const difference = 300;
    const spell = document.getElementById('spell');
    const spellEffect = new Image();
    spellEffect.style.width = '300px';
    spellEffect.style.height = '100px';
    spellEffect.style.position = 'absolute';

    spellEffect.src = this.castPath;
    spell.appendChild(spellEffect);
    let margin = 0;
    this.soundSpell.playSpell(spellSound);

    const time = setInterval(() => {

      if (margin === difference) {
        this.soundSpell.stopSpellSound();
        spell.removeChild(spellEffect);
        clearInterval(time);
        spell.style.width = '0';
        spell.style.height = '0';
        this.fight.setFinishHeroAnimation(true);
      }

      spellEffect.style.marginLeft = margin + 'px';
      margin += 1;
    });
  }

}
