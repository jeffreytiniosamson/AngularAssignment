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
  usernameInput: string;
  
  private messageSource = new BehaviorSubject<string>("jeffreytiniosamson");
  currentMessage = this.messageSource.asObservable();

  private errorSource = new BehaviorSubject<string>("");
  currentError = this.errorSource.asObservable();

  constructor(private http: Http) { }

  changeMessage(message: string){
    this.messageSource.next(message);
  }

  getMessage(){
    return this.messageSource.getValue();
  }

  /*
  [getUser] method accepts a string value (usernameInput)
  [getUser] method will make an Http GET request to GitHub REST API
    -If the request is successful we will get JSON for the username provided.
    -If the request is not successful (username does not exist) then an error will be caught.
  */
  getUser(value: string){
    return this.http.get('https://api.github.com/users/'+ value)
      .map(response => response.json())
      .catch(this.handleError);
  }

  /*
  [getUserRepos] method accepts a string value (usernameInput)
  [getUserRepos] method will make an Http GET request to GitHub REST API
    -If the request is successful we will get JSON of repositories for the username provided.
  */
  getUserRepos(value: string){
    return this.http.get('https://api.github.com/users/'+ value +'/repos')
    .map(response => response.json());
  }

  /*
  [handleError] method accepts a response object from 404 error and throws it
  */
  handleError(error: Response){
    return Observable.throw(error);
  }
}