import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {RegisterDialogComponent} from './register-dialog/register-dialog.component';
import {CharacterSharedService} from '../../shared/services/character-shared.service';
import {KeyControl} from '../../shared/model/KeyControl';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-landing',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class LandingComponent implements OnInit{

  public keyControl =  KeyControl;


  @HostListener('keypress',['$event']) doSmth(event: KeyboardEvent){

    if (this.keyControl.DIGIT_ONE === event.keyCode){
      this.document.location.href = 'https://github.com/KirillTK';
    }

    if (this.keyControl.DIGIT_TWO === event.keyCode) {
      this.logIn();
    }

    if (this.keyControl.DIGIT_THREE === event.keyCode) {
      this.openScreenPage();
    }
  }



  constructor(public dialog: MatDialog, private route: Router, private sharedCharacterService: CharacterSharedService, @Inject(DOCUMENT) private document: any) {
  }

  logIn() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      disableClose: true,
      autoFocus: true,
      panelClass: 'dialog'
    });

    dialogRef.afterClosed().subscribe(userInfo => {
      if (userInfo) {
        this.sharedCharacterService.setHeroName(userInfo.nickName);
        this.sharedCharacterService.saveHeroInfo(userInfo);
        this.route.navigate(['play']).catch(error => error);
      }
    });
  }


  openAuthorPage(){
    console.log('hi');
    this.route.navigate(['author']).catch(error => error);
  }

  openScreenPage(){
    this.route.navigate(['screen']).catch(error => error);
  }

  ngOnInit(): void {
  }

}
