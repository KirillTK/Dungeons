import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-win-game',
  templateUrl: './win-game.component.html',
  styleUrls: ['./win-game.component.css']
})
export class WinGameComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WinGameComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
