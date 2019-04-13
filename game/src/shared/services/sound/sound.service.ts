import {Injectable} from '@angular/core';

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

  playTheme(src: string): Promise<void> {
    this.mainTheme = new Audio();
    this.mainTheme.src = src;
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
    // this.soundSpell.addEventListener('ended', () => {
    //   this.soundSpell.currentTime = 0;
    //   this.soundSpell.play();
    // });
    this.soundSpell.load();
    return this.soundSpell.play();
  }

  stopSpellSound(){
    this.soundSpell.pause();
  }

  getMainThemeObject(){
    return this.mainTheme;
  }

}
