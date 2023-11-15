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
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  errorLoadingQuizzes = false;

  constructor(
    public quizSvc: QuizService
  ) {
  }

  ngOnInit() {
    const quizzes = this.quizSvc.loadQuizzes();
    console.log(quizzes);

    quizzes.subscribe(
      {
        next: data => {
          this.quizzes = data.map(x => ({
            quizName: x.name
            , quizQuestions: x.questions.map(y => ({
              questionName: y.name
            }))
            , markedForDelete: false
          }))
        }
        , error: err => {
          console.error(err.error);
          this.errorLoadingQuizzes = true;
        }
      }
    );

    console.log(this.quizzes);
  }

  quizzes: QuizDisplay[] = [];

  selectedQuiz: QuizDisplay | undefined = undefined;

  selectQuiz = (q: QuizDisplay) => {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz);
  };

  addNewQuiz = () => {
    const newQuiz = {
      quizName: "Untitled Quiz"
      , quizQuestions: []
      , markedForDelete: false
    };

    this.quizzes = [
      ...this.quizzes
      , newQuiz 
    ];

    this.selectedQuiz = newQuiz;
  };

  addNewQuestion = () => {
    
    if (this.selectedQuiz) {
      this.selectedQuiz.quizQuestions = [
        ...this.selectedQuiz.quizQuestions
        , {
          questionName: "Untitled Question"
        }
      ];
    }
  };

  removeQuestion = (questionToRemove: QuestionDisplay) => {
    if (this.selectedQuiz) {
      this.selectedQuiz.quizQuestions = this.selectedQuiz.quizQuestions.filter(x => x !== questionToRemove);
    }
  };

  jsPromisesOne = () => {
    const magicNumberPromise = this.quizSvc.getMagicNumber(true)
        .then(n => {
          console.log(n)
        })
        .catch(err => {
          console.error(err)
        });

  }

  jsPromisesTwo = async () => {
    try {
      const magicNumberPromise = await this.quizSvc.getMagicNumber(true);
      console.log(magicNumberPromise);
    } catch (err) {
      console.error(err)
    }
  }

  jsPromisesThree =async () => {
    try {
      let magicNumberPromises = []
      magicNumberPromises.push(this.quizSvc.getMagicNumber(true));
      magicNumberPromises.push(this.quizSvc.getMagicNumber(true));
      const results = await Promise.all(magicNumberPromises);
      console.log(results);
    } catch (err) {
      console.error(err);
    }
  }
}
