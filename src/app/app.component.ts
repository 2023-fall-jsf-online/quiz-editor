import { Component, OnInit} from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[];
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
      quizName: x.name
      , quizQuestions: x.questions.map((y: any) => ({
        questionName: y.name
      }))
    })
    )

    console.log(quizzes);
  }

  selectedQuiz: QuizDisplay | undefined = undefined;

  selectQuiz = (quiz: QuizDisplay) => {
    this.selectedQuiz = quiz;
  };

  quizzes: QuizDisplay[] = [];

  addNewQuiz = () => {
    const newQuiz = {
      quizName: "Untitled Quiz"
      , quizQuestions: []
    };

    this.quizzes = [
      ...this.quizzes
      , newQuiz 
    ];

    this.selectedQuiz = newQuiz;
    console.log(this.selectQuiz);
  };

  editedQuizName = "";
  editQuizName = () => {
    if (this.selectedQuiz != undefined) {
      this.selectedQuiz.quizName = this.editedQuizName;
    }
  }
}
