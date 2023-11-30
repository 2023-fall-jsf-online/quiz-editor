import { Component, OnInit} from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizzName: string;
  quizzQuestions: QuestionDisplay[];
}

interface QuestionDisplay {
  questionName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  constructor(
    public quizSvc:QuizService
  ) {

  }

  ngOnInit() {
    const quizzes = this.quizSvc.loadQuizes();

    this.quizzes = quizzes.map(x => ({
      quizzName: x.name
      , quizzQuestions: x.questions.map((y: any) => ({
        questionName: y.name
      }))
    })
    )

    console.log(quizzes);
  }

  selectedQuiz: QuizDisplay | undefined = undefined;

  selectQuiz = (quiz: QuizDisplay) => {
    this.selectedQuiz = quiz
    console.log(this.selectedQuiz);
  };

  quizzes: QuizDisplay[] = [];

  addNewQuizz = (name: string) => {
    const newQuiz = {
      quizName: name
      , quizQuestions: []
    };
  }
}
