import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {TasksService} from '../../../shared/services/tasks/tasks.service';
import {Task} from '../../../shared/model/Task';
import {KeyControl} from '../../../shared/model/KeyControl';
import {MatDialogRef} from '@angular/material';
import {QuizTask} from "../../../shared/model/QuizModel";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {


  public typeTask = '';
  public task: Task;
  public quizTask: QuizTask;
  public answer: string;
  @Output() result = new EventEmitter<string>();
  public keyControl = KeyControl;
  public dragArray: string[];



  @HostListener('document:keypress',['$event']) doSmth(event: KeyboardEvent){

    if (this.typeTask === ''){
      if (event.keyCode === this.keyControl.DIGIT_ONE) {
        this.onMathTask();
      }

      if (event.keyCode === this.keyControl.DIGIT_TWO) {
        this.onEngToRusTask();
      }

      if (event.keyCode === this.keyControl.DIGIT_THREE) {
        this.onRusToEngTask();
      }

      if (event.keyCode === this.keyControl.DIGIT_FOUR) {
        this.onCompare();
      }

      if (event.keyCode === this.keyControl.DIGIT_FIVE) {
        this.onQuiz();
      }

      if (event.keyCode === this.keyControl.DIGIT_SIX) {
        this.onRightOrder();
      }
    }

  }

  constructor(private tasks: TasksService, public dialogRef: MatDialogRef<TasksComponent>) {
  }

  ngOnInit() {
    this.answer = '';
  }

  onMathTask() {
    this.task = this.tasks.getMathTask();
    this.typeTask = 'math';
  }

  onEngToRusTask() {
    this.task = this.tasks.getEngToRusTast();
    this.typeTask = 'translate';
  }

  onRusToEngTask() {
    this.task = this.tasks.getRusToEngTast();
    this.typeTask = 'translate';
  }


  onCompare() {
    this.task = this.tasks.getCompareTask();
    this.typeTask = 'compare';
  }

  onQuiz(){
    this.quizTask = this.tasks.getQuizTask();
    this.typeTask = 'quiz';
  }


  onRightOrder(){
    this.task = this.tasks.getDragOrderTask();
    this.dragArray = this.task.expression.split('');
    this.typeTask = 'order';
  }


  getResultQuizTask(answer: string[]) {
    return answer[0] === this.quizTask.result ? {
      result: 'Correct',
      castPath: `./assets/spells/${this.typeTask}.gif`,
      castSound: `./assets/spells/sound/${this.typeTask}.mp3`
    } : {result: 'Incorrect'};
  }

  getResult(answer: string) {
    return answer.toLowerCase() === this.task.result ? {
      result: 'Correct',
      castPath: `./assets/spells/${this.typeTask}.gif`,
      castSound: `./assets/spells/sound/${this.typeTask}.mp3`
    } : {result: 'Incorrect'};
  }

  getDragResult(){
    return this.dragArray.join('') === this.task.result ? {
      result: 'Correct',
      castPath: `./assets/spells/${this.typeTask}.gif`,
      castSound: `./assets/spells/sound/${this.typeTask}.mp3`
    } : {result: 'Incorrect'};
  }


  close() {
    this.dialogRef.close(this.getResult(this.answer));
  }


  dropOrderLetter(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dragArray, event.previousIndex, event.currentIndex);
  }

}
