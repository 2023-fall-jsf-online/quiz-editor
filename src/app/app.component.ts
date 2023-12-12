import { Component, OnInit } from '@angular/core';
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
  quizzes: QuizDisplay[] = [];
  selectedQuiz: QuizDisplay | undefined;

  constructor(public quizSvc: QuizService) { }

  ngOnInit() {
    const quizzes = this.quizSvc.loadQuizzes();
    this.quizzes = quizzes.map(x => ({
      quizName: x.name,
      quizQuestions: x.questions.map((y: any) => ({
        questionName: y.name
      }))
    }));
  }

  selectQuiz = (q: QuizDisplay) => {
    this.selectedQuiz = q;
  };

  addNewQuiz = () => {
    const newQuiz: QuizDisplay = {
      quizName: 'Untitled Quiz',
      quizQuestions: []
    };
    this.quizzes = [...this.quizzes, newQuiz];
    this.selectedQuiz = newQuiz;
  };
  updateQuizName(event: Event) {
    const input = event.target as HTMLInputElement;
    if (this.selectedQuiz && input) {
      this.selectedQuiz.quizName = input.value;
    }
  }
}
