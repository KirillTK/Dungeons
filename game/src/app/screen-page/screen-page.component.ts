import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {KeyControl} from "../../shared/model/KeyControl";

@Component({
  selector: 'app-screen-page',
  templateUrl: './screen-page.component.html',
  styleUrls: ['./screen-page.component.css']
})
export class ScreenPageComponent implements OnInit {

  public index = 0;
  height: string = '400px';
  public screenshots = [{url: 'assets/screenshots/screen1.jpg'},
    {url: 'assets/screenshots/screen2.jpg'},
    {url: 'assets/screenshots/screen3.jpg'},
    {url: 'assets/screenshots/screen4.jpg'},
    {url: 'assets/screenshots/screen5.jpg'},
  ];

  private keyControl = KeyControl;
  @ViewChild('slideshow') slideshow: any;

  public src = 'assets/screenshots/menu.jpg';


  @HostListener('document:keypress',['$event']) doSmth(event: KeyboardEvent){
    if (this.keyControl.ENTER === event.keyCode){
      this.back();
    }

    if (this.keyControl.LETTER_A === event.keyCode) {
      console.log('here');
      this.slideshow.onSlide(1);
    }

    if (this.keyControl.LETTER_D === event.keyCode) {
      this.slideshow.onSlide(-1);
    }
  }

  constructor(private route: Router) {
  }

  ngOnInit() {
  }

  back(){
    this.route.navigate(['']).then();
  }


}
