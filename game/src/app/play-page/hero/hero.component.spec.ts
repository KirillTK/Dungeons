import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroComponent } from './hero.component';
import {PlayPageComponent} from "../play-page.component";
import {BarComponent} from "../bar/bar.component";
import {EnemyComponent} from "../enemy/enemy.component";

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if loaded character', function () {
    component.ngOnInit();
    expect(component.heroElement.nativeElement).not.toBe(null);
  });

});
