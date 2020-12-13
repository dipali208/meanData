import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from 'src/app/Class/state';

@Injectable({
  providedIn: 'root'
})
export class QuizStateService {

  constructor(private http: HttpClient) { }
  private questionUrl = 'http://localhost:8080/api/state';
  addState (state: State): Observable<State> {
    console.log(state, "This is a question")
   return this.http.post<State>(this.questionUrl, state);
 }
}
