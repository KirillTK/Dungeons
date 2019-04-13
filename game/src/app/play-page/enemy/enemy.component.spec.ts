import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyComponent } from './enemy.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('EnemyComponent', () => {
  let component: EnemyComponent;
  let fixture: ComponentFixture<EnemyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnemyComponent ],
      imports : [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnemyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if loaded enemy image', function () {
    component.ngOnInit();
    expect(component.enemyElement.nativeElement).not.toBe(null);
  });

  it('should check src path not empty',  function  () {
    component.ngOnInit();
    expect(component.enemyElement.nativeElement).not.toBe('');
  });

});
