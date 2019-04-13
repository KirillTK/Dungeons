import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharacterSharedService {

  private heroHealth: number;
  private enemyHealth: number;
  private enemyName: string;
  private heroName: string;

  constructor() {
  }

  setHeroHealth(value): void {
    this.heroHealth = value;
  }

  getHeroHealth(): number {
    return this.heroHealth;
  }

  setEnemyHealth(value): void {
    this.enemyHealth = value;
  }

  getEnemyHealth(): number {
    return this.enemyHealth;
  }

  setHeroName(name:string): void {
    this.heroName = name;
  }

  getHeroName(): string {
    return this.heroName;
  }

  setEnemyName(name:string): void {
    this.enemyName = name;
  }

  getEnemyName(): string {
    return this.enemyName;
  }


}
