import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

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

  loadQuizzes = async () => {
    // need to make a call to the Http EndPoint (observables)
    // OLD (w/o async/await)
    // const quizzesFromWeb = this.angularHttpClient.get<QuizFromWeb[]>(
    //   "https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Keith%20Lienert"
    // ).toPromise();

    const quizzesFromWeb = await lastValueFrom(
      this.angularHttpClient.get<QuizFromWeb[]>(
        "https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Keith%20Lienert"
      )
    );

    return quizzesFromWeb;
  };

  // insert getMagicNumber (promise lecture)
  getMagicNumber = (callerWantsToSucceed: boolean): Promise<number> => {
    return new Promise<number>(
      (resolve, reject) => {

        //
        // Some fancy long running code here...
        //

        // Ultimately resolve if successful.
        if (callerWantsToSucceed) {
          resolve(42);
        }
        // Or reject if failure.
        else {
          reject("Error");
        }
      }
    );
  };
}
