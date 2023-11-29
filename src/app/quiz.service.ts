 import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  loadQuizes = () => {
    const quizzesFromWeb: any[] = [
      {
        name: 'Quiz 1'
        , questions: [
          {
            name: 'Question 1'
          }
          , {
            name: 'Question 1'
          }
        ]
      }
      , {
        name: 'Quiz 2'
        , questions: [
          {
            name: 'Question 1'
          }
          , {
            name: 'Question 1'
          }
        ]
      }
    ];
    return quizzesFromWeb;
  }
}
