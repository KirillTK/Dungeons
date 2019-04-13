import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component, ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {CharacterSharedService} from '../../../shared/services/character-shared.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit, AfterViewChecked {

  @ViewChild('heroHealth') heroHealth: ElementRef;
  @ViewChild('enemyHealth') enemyHealth: ElementRef;
  private _heroHealth: number;
  private _enemyHealth: number;

  @Input() score: number;

  @ViewChild('enemyName') enemyName: ElementRef;
  @ViewChild('heroName') heroName: ElementRef;

  @ViewChild('heroHP') heroHP: ElementRef;

  @ViewChild('enemyHP') enemyHP: ElementRef;


  constructor(private cd: ChangeDetectorRef, private characterSharedService: CharacterSharedService) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (this.characterSharedService.getHeroHealth() !== undefined && this.characterSharedService.getEnemyHealth() !== undefined) {
      this._enemyHealth = this.characterSharedService.getEnemyHealth();
      this.enemyHealth.nativeElement.innerText = this._enemyHealth + ' / 100';

      this._heroHealth = this.characterSharedService.getHeroHealth();
      this.heroHealth.nativeElement.innerText = this._heroHealth + ' / 100';


      this.enemyName.nativeElement.innerText = this.characterSharedService.getEnemyName();
      this.heroName.nativeElement.innerText = this.characterSharedService.getHeroName();

      this.calculateHero(this._heroHealth, this.heroHP);
      this.calculateHero(this._enemyHealth, this.enemyHP);

    }
  }

  calculateHero(health: number, hpElement: ElementRef): void {
    const characterHealth = health;

    if (characterHealth === 100) {
      hpElement.nativeElement.style.width = '100%';
      return;
    }

    if (characterHealth < 100) {
      hpElement.nativeElement.style.width = characterHealth + '%';
    }
  }

}
