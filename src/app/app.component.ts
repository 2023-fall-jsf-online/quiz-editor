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

  errorLoadingQuizzes: boolean = false;

  ngOnInit(): void {
    const quizzes = this.quizSvc.loadQuizzes();

    quizzes.subscribe({
      next: data => {
        this.quizzes = data.map(x => ({
          quizName: x.name,
          quizQuestions: x.questions.map(y => ({
            questionName: y.name
          })),
          markedForDelete: false
        }));
      },
      error: err => {
        console.error(err.error);
        this.errorLoadingQuizzes = true;
      }
    });
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

  jsPromiseOne = () => {
    const n = this.quizSvc.getMagicNumber(true);
    console.log(n);

    n.then(
      number => {
        console.log(number);

        const n2 = this.quizSvc.getMagicNumber(true);
        n2.then(x => console.log(x)).catch(e => console.error(e));
      }
    ).catch(
      err => {
        console.error(err);
      }
    )
  }

  jsPromiseTwo = async () => {
    try {
      const x = await this.quizSvc.getMagicNumber(true);
      console.log(x);

      const y = await this.quizSvc.getMagicNumber(true);
      console.log(y);
    } catch (err) {
      console.error(err);
    }
  }

  jsPromiseThree = async () => {
    try {
      const x = this.quizSvc.getMagicNumber(true);
      console.log(x);

      const y = this.quizSvc.getMagicNumber(true);
      console.log(y);

      const results = await Promise.all([x, y]);
      //const results = await Promise.race([x, y]);
      console.log(results);
    } catch (err) {
      console.error(err);
    }
  }
}
