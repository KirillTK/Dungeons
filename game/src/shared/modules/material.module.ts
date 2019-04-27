import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatRadioModule,
  MatTableModule,
  MatTooltipModule
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
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    DragDropModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }
