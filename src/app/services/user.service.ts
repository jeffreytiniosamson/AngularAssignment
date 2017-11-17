import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response } from '@angular/http';
import { ErrorHandler } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';


@Injectable()
export class UserService {

  private messageSource = new BehaviorSubject<string>("");
  currentMessage = this.messageSource.asObservable();

  private errorSource = new BehaviorSubject<string>("");
  currentError = this.errorSource.asObservable();

  constructor(private http: Http) {}

  getUserRepos(value: string){
    return this.http.get('https://api.github.com/users/'+ value +'/repos')
    .map(response => response.json());
  }

  getUser(value: string){
    return this.http.get('https://api.github.com/users/'+ value)
      .map(response => response.json())
      .catch(this.handleError);
  }

  handleError(error: Response){
    return Observable.throw(error);
  }
}
