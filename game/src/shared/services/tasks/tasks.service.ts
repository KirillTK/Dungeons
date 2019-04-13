import {Injectable} from '@angular/core';
import {engToRus} from '../../model/engToRus';
import * as _ from 'lodash';
import {Task} from '../../model/Task';
import {rusToEng} from '../../model/rusToEng';
import {quiz} from "../../model/Quiz";
import {QuizTask} from "../../model/QuizModel";
import {dragOrder} from "../../model/DragOrder";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private mathExpression = ['+', '-', '*'];

  constructor() {
  }

  getMathTask(): Task {
    const firstNumber = _.random(10);
    const secondNumber = _.random(10);
    const expressionIndex = _.random(this.mathExpression.length - 1);
    const expression = firstNumber + this.mathExpression[expressionIndex] + secondNumber;
    const result = eval(expression) + '';
    return {expression: expression, result: result};
  }

  getEngToRusTast(): Task {
    const index = _.random(engToRus.length - 1);
    return engToRus[index];
  }

  getRusToEngTast(): Task {
    const index = _.random(rusToEng.length - 1);
    return rusToEng[index];
  }

  getCompareTask(): Task {
    const firstNumber = _.random(30);
    const secondNumber = _.random(30);
    const expression  = firstNumber + ' ? '+ secondNumber;
    const result = this.getAnswerCompareTask(firstNumber,secondNumber);
    return {expression: expression, result: result};
  }

  getQuizTask(): QuizTask{
    return quiz[_.random(quiz.length-1)];
  }

  getDragOrderTask(): Task {
    return dragOrder[_.random(dragOrder.length-1)];
  }


  private getAnswerCompareTask(a,b){
    if (a === b) {
      return '=';
    }
    return a > b ? '>' : '<';
  }
}
