import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {User} from '../../model/User';


@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {

  private itemsCollection: AngularFirestoreCollection<User>;
  private nickName: string;


  constructor(private db: AngularFirestore) {
    this.itemsCollection = this.db.collection('scoreboard');
  }

  getScoreboard(): Observable<User[]> {
    return this.itemsCollection.valueChanges();
  }

  setNickname(nickName: string): void {
    this.nickName = nickName;
  }

  getNickName(): string {
    return this.nickName;
  }

  addUser(user: User): Promise<any> {
    return this.itemsCollection.add(user);
  }

}
