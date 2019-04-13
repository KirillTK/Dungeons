import {Injectable} from '@angular/core';
import {Character} from '../../model/character';
import * as _ from 'lodash';
import {NamesForEnemy} from '../../model/NamesForEnemy';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor() {
  }


  getRandomCharacter(characters: string[]): string {
    return characters[_.random(characters.length - 1)];
  }

  getRandomName(): string {
    const adject = NamesForEnemy.ADJECTIVES[_.random(NamesForEnemy.ADJECTIVES.length-1)];
    const type = NamesForEnemy.TYPE[_.random(NamesForEnemy.TYPE.length-1)];
    const name = NamesForEnemy.NAME[_.random(NamesForEnemy.NAME.length-1)];
    return adject + ' ' + type + ' ' + name;
  }

  public getCharacterData(characters: string[], typeCharacter?: string): Promise<Character> {
    const path = this.getRandomCharacter(characters);
    return fetch(path)
      .then(response => response.json())
      .then((data:Character) => {
        if (typeCharacter === 'enemy') {
          data.name = this.getRandomName();
          return data;
        }
        return data;
      });
  }

}
