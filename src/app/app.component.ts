import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  constructor(
      public quizzSvc: QuizService
  ) { }

  ngOnInit(): void {
      const quizzes = this.quizzSvc.loadQuizzes();
      console.log(quizzes);
  }
}
