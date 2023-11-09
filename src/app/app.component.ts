import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[];
  markedForDelete: boolean;
}

interface QuestionDisplay {
  questionName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'quiz-editor';

  constructor(public quizSvc: QuizService) {}

  ngOnInit(): void {
    const quizzes = this.quizSvc.loadQuizzes();

    this.quizzes = quizzes.map(x => ({
      quizName: x.name,
      quizQuestions: x.questions.map((y: any) => ({
        questionName: y.name
      })),
      markedForDelete: false
    }));
  }

  quizzes: QuizDisplay[] = [];

  selectedQuiz: QuizDisplay | undefined = undefined;
  selectQuiz = (q: QuizDisplay) => {
    this.selectedQuiz = q;
  };

  addNewQuiz = () => {
    let newQuiz: QuizDisplay = {
      quizName: "Untitled Quiz",
      quizQuestions: [],
      markedForDelete: false
    }

    this.quizzes.push(newQuiz);

    this.selectedQuiz = newQuiz;
  }

  addNewQuestion = () => {
    if (this.selectedQuiz) {
      this.selectedQuiz.quizQuestions = [
        ...this.selectedQuiz.quizQuestions,
        {
          questionName: "Untitled Question"
        }
      ];
    }
  }

  removeQuestion = (questionToRemove: QuestionDisplay) => {
    if (this.selectedQuiz) {
      this.selectedQuiz.quizQuestions = this.selectedQuiz.quizQuestions.filter(x => x !== questionToRemove);
    }
  }
}
