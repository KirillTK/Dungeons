import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-music-settings',
  templateUrl: './music-settings-dialog.component.html',
  styleUrls: ['./music-settings-dialog.component.css']
})
export class MusicSettingsComponent  {
    constructor(
        public dialogRef: MatDialogRef<MusicSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}
}
