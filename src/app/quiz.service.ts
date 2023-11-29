 import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  loadQuizes = () => {
    const quizzesFromWeb: any[] = [
      {
        name: 'ABC'
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
        name: 'DEF'
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
