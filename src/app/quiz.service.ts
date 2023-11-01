import { Injectable } from '@angular/core';

interface Quiz {
  name: string
  , questions: Question[]
}

interface Question {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  loadQuizzes = () => {
    const quizzesFromWeb: Quiz[] = [
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
