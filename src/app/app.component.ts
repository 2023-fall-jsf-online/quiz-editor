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

  constructor(
    public quizSvc: QuizService
  ) {
  }

  errorLoadingQuizzes = false;

  // load quizzes from cloud (async)
  loadQuizzesFromCloud = async () => {
    try {
      const quizzes = await this.quizSvc.loadQuizzes() ?? [];
      console.log(quizzes);

      this.quizzes = quizzes.map(x => ({
        quizName: x.name
        , quizQuestions: x.questions.map(y => ({
          questionName: y.name
        }))
        , markedForDelete: false
      }));

    } catch (e) {
      console.error(e);
      this.errorLoadingQuizzes = true;
    }
  };

  // new version of ngOnInit() -- uses async/await
  ngOnInit() {
    this.loadQuizzesFromCloud();
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

  jsPromiseOne = () => {
    const n = this.quizSvc.getMagicNumber(true);
    console.log(n); // returns a promise
    
    n.then(
      num => {
        console.log(num); // getting the actual value (if promise is 'resolved')

        const n2 = this.quizSvc.getMagicNumber(true);
        console.log(n2);
        n2.then(x => console.log(x)).catch(e => console.log(e));
      }
    ).catch(
      err => {
        console.error(err);
      }
    )
  }

  /**
   * More modern way to deal with promises
   */
  jsPromiseTwo = async () => {
    try {
      const x = await this.quizSvc.getMagicNumber(true);
      console.log(x);

      const y = await this.quizSvc.getMagicNumber(true);
      console.log(y);

    } catch (error) {     
      console.error(error);
    }
  }

  /**
   * 
   */
  jsPromiseThree = async () => {
    
    try {
      const a = this.quizSvc.getMagicNumber(true);
      // console.log(a);

      const b = this.quizSvc.getMagicNumber(true);
      // console.log(b);

      // const c = this.quizSvc.getMagicNumber(true);
      // console.log(c);

      // const d = this.quizSvc.getMagicNumber(true);
      // console.log(d);

      // const results = await Promise.all([a, b]);

      const results = await Promise.race([a, b]); // shows just a single number, whichever one comes back first

      console.log(results);
      
    } catch (e) {
      console.error(e);
    }
  }
  
  
  
}
