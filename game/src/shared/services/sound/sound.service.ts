import { MUSIC } from './../../model/Music';
import { Inject } from '@angular/core';
import {Injectable} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  private mainTheme: any;
  private soundSpell: any;

  constructor() {
  }

  playAudio() {

  }

  getTheme(){
    const theme = JSON.parse(localStorage.getItem('theme'));
    return theme ?  theme : MUSIC[0];
  }

  playTheme(src: string): Promise<void> {

    const music = this.getTheme();

    this.mainTheme = new Audio();
    this.mainTheme.src = music.path;
    this.mainTheme.volume = 0.1;
    this.mainTheme.addEventListener('ended', () => {
      this.mainTheme.currentTime = 0;
      this.mainTheme.play();
    });
    this.mainTheme.load();
    return this.mainTheme.play();
  }

  stopTheme(){
    this.mainTheme.pause();
  }

  playSpell(src: string){
    this.soundSpell = new Audio();
    this.soundSpell.src = src;
    this.soundSpell.volume = 0.1;
    this.soundSpell.load();
    return this.soundSpell.play();
  }

  stopSpellSound(){
    this.soundSpell.pause();
  }

  getMainThemeObject(){
    return this.mainTheme;
  }

  saveTheme(music) {
    localStorage.setItem('theme', JSON.stringify(music));
  }

}
