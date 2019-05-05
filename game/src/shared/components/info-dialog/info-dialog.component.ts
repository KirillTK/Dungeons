import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

  index = 0;
  height: string = '400px';
  screenshots = [{url: 'assets/screenshots/screen1.jpg', caption: 'Hi manasdasdasdasdas'},
    {url: 'assets/screenshots/screen2.jpg', caption: 'Hi manasdasdasdasdas'},
    {url: 'assets/screenshots/screen3.jpg', caption: 'Hi manasdasdasdasdas'},
    {url: 'assets/screenshots/screen4.jpg', caption: 'Hi manasdasdasdasdas'},
    {url: 'assets/screenshots/screen5.jpg', caption: 'Hi manasdasdasdasdas'},
  ];

  constructor(public dialogRef: MatDialogRef<InfoDialogComponent>,) { }

  ngOnInit() {
  }

}
