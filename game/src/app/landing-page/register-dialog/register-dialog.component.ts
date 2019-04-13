import {Component, Inject, OnInit} from '@angular/core';
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {

  characterInfo = [
    {name: 'archer', description: 'blah-blah-blah', imgPath: 'assets/presentation_character/archer.png'},
    {name: 'knight', description: 'blah2-blah2-blah2', imgPath: 'assets/presentation_character/knight.png'},
    {name: 'wizzard', description: 'blah3-blah3-blah3', imgPath: 'assets/presentation_character/wizzard.png'}
  ];


  nickName: string;

  nickNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(13),
  ]);

  characterControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
  }

  submit(): void {
    if (this.nickNameFormControl.valid && this.characterControl.valid) {
      this.dialogRef.close({
        nickName: this.nickName,
        selectedHero: this.characterControl.value
      });
    }
  }

  ngOnInit(): void {
  }

}
