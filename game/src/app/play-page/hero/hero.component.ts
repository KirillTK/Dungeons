import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CharacterService} from '../../../shared/services/character/character.service';
import {Path} from '../../../shared/model/Path';
import {Character} from '../../../shared/model/character';
import {CharacterSharedService} from '../../../shared/services/character-shared.service';
import {SoundService} from '../../../shared/services/sound/sound.service';
import {DAMAGE} from '../../../shared/model/Damage';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnChanges {

  public hero: Character;
  private castPath: string;
  @Input() result: string;
  @Output() gameResult = new EventEmitter<string>();
  @ViewChild('hero') heroElement: ElementRef;
  @Output() isFinishAnimationAttack = new EventEmitter<any>();
  @Input() isEnemyAttackEnd: boolean;

  constructor(private character: CharacterService, private characterSharedService: CharacterSharedService, private soundSpell: SoundService) {
  }

  ngOnInit() {
    this.character.getUserCharacter().then((character: Character) => {
      this.hero = character;
      this.characterSharedService.setHeroHealth(this.hero.health);
      this.heroElement.nativeElement.src = this.hero.pathCharacter;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.hasOwnProperty('result') && typeof changes.result.currentValue !== 'undefined') {
      if (changes.result.currentValue.result === 'Correct') {
        const spellSound = changes.result.currentValue.castSound;
        this.castPath = changes.result.currentValue.castPath;
        this.attack(spellSound);
      }


      if (changes.result.currentValue.result === 'Incorrect') {
        this.reduceHealth(25);
      }

    }


    this.isEnemyAttackEnd = false;
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
    if (this.hero.health - amountHealth === 0) {
      this.die();
      this.gameResult.emit('lose');
      this.isFinishAnimationAttack.emit(false);
    } else {
      this.hurt();
    }
    this.hero.health -= amountHealth;
    this.characterSharedService.setHeroHealth(this.hero.health);
  }

  onAttack(spellSound: string) {
    const difference = 500;
    const spell = document.getElementById('spell');
    const spellEffect = new Image();
    spellEffect.style.width = '300px';
    spellEffect.style.height = '100px';

    spellEffect.src = this.castPath;
    spell.appendChild(spellEffect);
    let margin = 0;
    this.soundSpell.playSpell(spellSound);

    const time = setInterval(() => {

      if (margin === difference) {
        this.soundSpell.stopSpellSound();
        spell.removeChild(spellEffect);
        clearInterval(time);
        this.isFinishAnimationAttack.emit(true);
      }

      spellEffect.style.marginLeft = margin + 'px';
      margin += 1;
    });

  }

}
