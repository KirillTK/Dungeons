import {Task} from "./Task";

export interface QuizTask extends Task{
  answerChoices: string[];
}
