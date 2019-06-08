import { CharacterService } from './character/character.service';
import { Character } from './../model/character';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private character: CharacterService, private router: Router) { }

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const character = this.character.getUserInfo();
    if(character) {
      return true;
    }
    this.router.navigate(['']);
    return true;
  }

}
