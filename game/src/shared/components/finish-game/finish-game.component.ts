import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-finish-game',
  templateUrl: './finish-game.component.html',
  styleUrls: ['./finish-game.component.css']
})
export class FinishGameComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<FinishGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

}
