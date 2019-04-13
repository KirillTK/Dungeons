import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatRadioModule,
  MatTableModule
} from '@angular/material';
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
  imports: [
    MatDialogModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    DragDropModule,
    MatIconModule
  ],
  exports: [
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    DragDropModule,
    MatIconModule
  ]
})
export class MaterialModule { }
