import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarComponent } from './bar.component';
import {CharacterSharedService} from "../../../shared/services/character-shared.service";

describe('BarComponent', () => {
  let component: BarComponent;
  let fixture: ComponentFixture<BarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bar contain user name', function () {
    const service: CharacterSharedService = TestBed.get(CharacterSharedService);
    service.setHeroName('KirillTK');
    service.setHeroHealth(100);
    service.setEnemyHealth(100);
    component.ngAfterViewChecked();
    expect(component.heroName.nativeElement.innerText).toBe('KirillTK');
  });

  it('should bar contain enemy name', function () {
    const service: CharacterSharedService = TestBed.get(CharacterSharedService);
    service.setEnemyName('Troll');
    service.setHeroHealth(100);
    service.setEnemyHealth(100);
    component.ngAfterViewChecked();
    expect(component.enemyName.nativeElement.innerText).toBe('Troll');
  });

  it('should bar display 100hp in hero character', function () {
    const service: CharacterSharedService = TestBed.get(CharacterSharedService);
    service.setHeroHealth(100);
    service.setEnemyHealth(100);
    component.ngAfterViewChecked();
    expect(component.heroHP.nativeElement.style.width).toBe('100%');
    expect(component.heroHealth.nativeElement.innerText).toBe('100 / 100')
  });

  it('should bar display 90hp in enemy character', function () {
    const service: CharacterSharedService = TestBed.get(CharacterSharedService);
    service.setHeroHealth(100);
    service.setEnemyHealth(90);
    component.ngAfterViewChecked();
    expect(component.enemyHP.nativeElement.style.width).toBe('90%');
    expect(component.enemyHealth.nativeElement.innerText).toBe('90 / 100')
  });

  it('should currect caltulate width in health bar', function () {
    component.calculateHero(75, component.heroHP);
    expect(component.heroHP.nativeElement.style.width).toBe('75%');
  });

});
