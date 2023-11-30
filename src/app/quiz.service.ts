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
            name: 'What kind of movie do you like?'
          }
          , {
            name: 'What is the name of that girl?'
          }
        ]
      }
      , {
        name: 'DEF'
        , questions: [
          {
            name: 'What is your favorite fruit?'
          }
          , {
            name: 'Do you like watching movies?'
          }
        ]
      }
    ];
    return quizzesFromWeb;
  }
}
