import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string
  , quizQuestions: QuestionDisplay[]
}

interface QuestionDisplay {
  questionName: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  constructor(public quizSvc: QuizService) {  }

  ngOnInit(): void {
    this.quizzes = this.quizSvc.loadQuizzes().map(x => ({
      quizName: x.name
      , quizQuestions: x.questions.map(y => ({
        questionName: y.name
      }))
    }));
  }

  quizzes: QuizDisplay[] = [];

  selectedQuiz: QuizDisplay | undefined = undefined;

  selectQuiz(q: QuizDisplay) {
    this.selectedQuiz = q;
  }

  addNewQuiz():void {
    this.quizzes = [
      ...this.quizzes,
      {
        quizName: "Untitled Quiz",
        quizQuestions: []
      }
    ]
  }
}
