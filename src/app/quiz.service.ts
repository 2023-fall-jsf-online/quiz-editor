import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface QuizFromWeb {
  name: string;
  questions: {
    name: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private angularHttpClient: HttpClient
  ) { }

  loadQuizzes = () => {
    // need to make a call to the Http EndPoint (observables)
    const quizzesFromWeb = this.angularHttpClient.get<QuizFromWeb[]>(
      "https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name1=Keith%20Lienert"
    );

    return quizzesFromWeb;
  };
}
