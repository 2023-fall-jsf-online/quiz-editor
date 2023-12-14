import { Component, OnInit } from '@angular/core';
import { QuizFromWeb, QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[];
  markedForDelete: boolean;
  newlyAddedQuiz: boolean;
  naiveQuizCheckSum: string; // generate one string of the un-edited quiz
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

  loading = true;
  errorLoadingQuizzes = false;

  /**
   * generates the naivie quiz checkSum
   */
  generateNaiveQuizCheckSum = (quiz: QuizFromWeb) => {
    return quiz.name + quiz.questions.map(x => '~' + x.name).join('');
    
  };

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
        , newlyAddedQuiz: false
        , naiveQuizCheckSum: this.generateNaiveQuizCheckSum(x)
      }));      

      this.loading = false;
    }
    catch (err) {
      console.error(err);
      this.errorLoadingQuizzes = true;
      this.loading = false;      
    }
  };

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
      , newlyAddedQuiz: true
      , naiveQuizCheckSum: ""
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
    const n = this.quizSvc.getMagicNumber(true);
    console.log(n); // ? ? ? 

    n.then(
      number => {
        console.log(number);

        const n2 = this.quizSvc.getMagicNumber(true);
        console.log(n2); // ? ? ?
        
        n2.then(x => console.log(x)).catch(e => console.error(e));
      }
    ).catch(
      err => {
        console.error(err);
      }
    )
  };

  jsPromisesTwo = async () => {

    try {
      const x = await this.quizSvc.getMagicNumber(true);
      console.log(x); // ? ? ?

      const y = await this.quizSvc.getMagicNumber(true);
      console.log(y); // ? ? ?
    }
    
    catch (err) {
      console.error(err);
    }
  };

  jsPromisesThree = async () => {

    try {
      const x = this.quizSvc.getMagicNumber(true);
      console.log(x); // ? ? ?

      const y = this.quizSvc.getMagicNumber(true);
      console.log(y); // ? ? ?

      const results = await Promise.all([x, y]);
      // const results = await Promise.race([x, y]);
      console.log(results); // ? ? ?
    }
    
    catch (err) {
      console.error(err);
    }
  };

  /**
   * Button to Cancel all changes
   */
  cancelAllChanges = () => {
    this.loadQuizzesFromCloud();
    this.selectedQuiz = undefined;;

  };

  /**
   * Deleted Quizzes
   * @returns QuizDisplay[] of quizzes marked for delete
   */
  getDeletedQuizzes = () => {
    return this.quizzes.filter(x => x.markedForDelete);
  }

  get deletedQuizCount() {
    return this.getDeletedQuizzes().length; 
  }

  /**
   * Added Quizzes
   * @returns QuizDisplay[] of newly added quizzes
   */
  getAddedQuizzes = () => {
    return this.quizzes.filter(x => x.newlyAddedQuiz && !x.markedForDelete);
  }

  get addedQuizCount() {
    return this.getAddedQuizzes().length;
  }
  

  /**
   * Edited Quizzes
   */
  getEditedQuizzes = () => {
    return this.quizzes.filter(x => 
        x.quizName + x.quizQuestions.map(y => '~' + y.questionName).join('') !== x.naiveQuizCheckSum
        && !x.newlyAddedQuiz
        && !x.markedForDelete
      );   
  };

  get editedQuizCount() {
    return this.getEditedQuizzes().length;
  }

}
