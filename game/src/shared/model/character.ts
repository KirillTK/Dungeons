export interface Character {
  health: number;
  pathCharacter: string;
  pathAttack: string;
  pathDeath: string;
  pathHeat: string;
  name?:string;
  pathWalkBack?: string;
  pathWalkStraight?: string;
  type: string;
}
