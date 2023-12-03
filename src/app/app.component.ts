import { Component, OnInit } from '@angular/core';
import { QuizService, QuizFromWeb } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[];
  markedForDelete: boolean;
  newlyAddedQuiz: boolean;
  naiveQuizChecksum: string;
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
  loadingQuizzes: boolean = true;

  generateNaiveQuizChecksum = (quiz: QuizFromWeb) => {
    return quiz.name + quiz.questions.map(x => '~' + x.name).join('');
  }

  loadQuizzesFromCloud = async () => {
    try {
      const quizzes = await this.quizSvc.loadQuizzes() ?? [];
      this.quizzes = quizzes.map(x => ({
        quizName: x.name,
        quizQuestions: x.questions.map(y => ({
          questionName: y.name
        })),
        markedForDelete: false,
        newlyAddedQuiz: false,
        naiveQuizChecksum: this.generateNaiveQuizChecksum(x)
      }));
    } catch (err) {
      console.error(err);
      this.errorLoadingQuizzes = true;
      this.loadingQuizzes = false;
    }
    this.loadingQuizzes = false;
  }

  ngOnInit(): void {

    this.loadQuizzesFromCloud();
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
      markedForDelete: false,
      newlyAddedQuiz: true,
      naiveQuizChecksum: ""
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

  cancelAllChanges = () => {
    this.loadQuizzesFromCloud();
    this.selectedQuiz = undefined;
  }

  getDeletedQuizzes = () => {
    return this.quizzes.filter(x => x.markedForDelete);
  }

  get deletedQuizCount() {
    return this.getDeletedQuizzes().length;
  }

  getNewlyAddedQuizzes = () => {
    return this.quizzes.filter(x => x.newlyAddedQuiz && !x.markedForDelete);
  }

  get newlyAddedQuizCount() {
    return this.getNewlyAddedQuizzes().length;
  }

  getEditedQuizCount = () => {
    return this.quizzes.filter(x => x.quizName + x.quizQuestions.map(y => '~' + y.questionName).join('') !== x.naiveQuizChecksum 
    && !x.newlyAddedQuiz 
    && !x.markedForDelete);
  }

  get editedQuizCount() {
    return this.getEditedQuizCount().length;
  }

}
