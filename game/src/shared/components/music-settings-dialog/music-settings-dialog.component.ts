import { SoundService } from './../../services/sound/sound.service';
import { MUSIC } from "./../../model/Music";
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-music-settings",
  templateUrl: "./music-settings-dialog.component.html",
  styleUrls: ["./music-settings-dialog.component.css"]
})
export class MusicSettingsComponent implements OnInit {
  music = MUSIC;

  constructor(
    public dialogRef: MatDialogRef<MusicSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sound: SoundService
  ) {}

  ngOnInit(): void {
    console.log(this.music);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  changeTheme(event, music) {
    console.log(music);
    this.sound.saveTheme(music);
  }
}
