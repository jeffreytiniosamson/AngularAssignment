import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ErrorHandler } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class UserService {

  private messageSource = new BehaviorSubject<string>("defunkt");
  currentMessage = this.messageSource.asObservable();

  constructor(private http: Http) { }

  changeMessage(message: string){
    this.messageSource.next(message);
  }

  getUsers(){
    return this.http.get('https://api.github.com/users')
    .map(res => res.json());
  }

  getUser(value: string){
    return this.http.get('https://api.github.com/users/'+ value)
      .map(res => res.json());
  }
}
