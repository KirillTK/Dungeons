import {AfterContentInit, Component, HostListener, OnInit} from '@angular/core';
import {SoundService} from '../../shared/services/sound/sound.service';
import {Path} from '../../shared/model/Path';
import {KeyControl} from "../../shared/model/KeyControl";

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.css']
})
export class ApplicationPageComponent implements OnInit, AfterContentInit{

  public turnOnMusic = true;
  public keyControl = KeyControl;


  @HostListener('document:keypress',['$event']) doSmth(event: KeyboardEvent){
    if (this.keyControl.Backquote === event.keyCode){
      Promise.resolve().then(()=>this.playTheme());
    }
  }


  constructor(private sound: SoundService) { }

  ngAfterContentInit(){

  }

  ngOnInit(): void {
  }

  playTheme() {
    if (this.turnOnMusic) {
      this.sound.playTheme(Path.MAIN_THEME).then();
    } else {
      this.sound.stopTheme();
    }
    this.turnOnMusic = !this.turnOnMusic;
  }

}
