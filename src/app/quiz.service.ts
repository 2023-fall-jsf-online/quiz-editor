import { Injectable } from '@angular/core';

interface quiz {
  name: string
  , questions: question[]
}

interface question {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  loadQuizzes = () => {
    const quizzesFromWeb: quiz[] = [
      {
        name: "Quiz 1"
        , questions: [
          {
            name: "Question 1"
          }
          , {
            name: "Question 2"
          }
        ]
      }
      , {
        name: "Quiz 2"
        , questions: [
        ]
      }
    ];

    return quizzesFromWeb;
  };
}
