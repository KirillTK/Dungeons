import { rusToEngDifficult2 } from './../../model/rusToEng';
import { engToRusDifficult2 } from './../../model/engToRus';
import { FightService } from './../fight.service';
import {Injectable} from '@angular/core';
import {engToRus} from '../../model/engToRus';
import * as _ from 'lodash';
import {Task} from '../../model/Task';
import {rusToEng} from '../../model/rusToEng';
import {quiz, quizDifficult2} from "../../model/Quiz";
import {QuizTask} from "../../model/QuizModel";
import {dragOrder, dragOrderDifficult2} from "../../model/DragOrder";
import {DAMAGE} from "../../model/Damage";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private mathExpression = ['+', '-', '*'];
  diffucult = 2;

  constructor(private fight: FightService) {
  }

  getMathTask(): Task {
    let firstNumber = _.random(10);
    let secondNumber = _.random(10);
    if(this.diffucult === 2) {
      firstNumber = _.random(20);
      secondNumber = _.random(20);
    }
    const expressionIndex = _.random(this.mathExpression.length - 1);
    const expression = firstNumber + this.mathExpression[expressionIndex] + secondNumber;
    const result = eval(expression) + '';
    return {expression: expression, result: result, damage: DAMAGE.MATH_TASK};
  }

  getEngToRusTast(): Task {
    const task = this.getTaskByDifficult(engToRus, engToRusDifficult2);
    const index = _.random(task.length - 1);
    return task[index];
  }

  getRusToEngTast(): Task {
    const task = this.getTaskByDifficult(rusToEng, rusToEngDifficult2);
    const index = _.random(task.length - 1);
    return task[index];
  }

  getCompareTask(): Task {
    let firstNumber = _.random(30);
    let secondNumber = _.random(30);
    if(this.diffucult === 2) {
      firstNumber = _.random(100);
      secondNumber = _.random(100);
    }
  
    const expression  = firstNumber + ' ? '+ secondNumber;
    const result = this.getAnswerCompareTask(firstNumber,secondNumber);
    return {expression: expression, result: result, damage: DAMAGE.COMPARE_TASK};
  }

  getQuizTask(): QuizTask{
    const task = this.getTaskByDifficult(quiz, quizDifficult2);
    const index = _.random(task.length - 1);
    return task[index];
  }

  getDragOrderTask(): Task {
    const task = this.getTaskByDifficult(dragOrder, dragOrderDifficult2);
    const index = _.random(task.length - 1);
    return task[index];
  }


  private getAnswerCompareTask(a,b){
    if (a === b) {
      return '=';
    }
    return a > b ? '>' : '<';
  }

  private getDifficult(): number {
    return  this.diffucult > 2 ? this.diffucult = 2 : this.diffucult;
  }

  private getTaskByDifficult(easy, medium) {
    const difficult = this.getDifficult();
    switch(difficult) {
      case 1: 
        return easy;
      case 2:
        return medium;
      default:
        return easy;
    }
  }
}
