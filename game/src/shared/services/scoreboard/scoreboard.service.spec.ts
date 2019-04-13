import { TestBed } from '@angular/core/testing';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ScoreboardService} from './scoreboard.service';
import {BehaviorSubject} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';


const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({foo: 'bar'}),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  })
};


describe('ScoreBoardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFirestore, useValue: FirestoreStub },
    ],
    imports: [ BrowserAnimationsModule ]
  }));

  it('should be created', () => {
    const service: ScoreboardService = TestBed.get(ScoreboardService);
    expect(service).toBeTruthy();
  });

  it('should return nickname', function () {
    const service: ScoreboardService = TestBed.get(ScoreboardService);
    service.setNickname('KirillTK');
    expect(service.getNickName()).toBe('KirillTK');
  });

});
