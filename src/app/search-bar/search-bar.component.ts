import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { UserRepoComponent } from '../user-repo/user-repo.component';
import { ErrorHandler } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  providers: [UserService],
  styleUrls: ['./search-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent implements OnInit {
  navbarTitle = "GitHub Profile Search";
  usernameInput: string;
  @Output() messageEvent = new EventEmitter<string>();
  usernameEntered: boolean;
  usernameBlank: boolean;
  reposClicked: boolean;

  errorMessage = "";

  constructor(private userService: UserService) { }

  ngOnInit() {

    console.log(this.usernameInput+'goo1');
    this.userService.currentMessage.subscribe(message => this.usernameInput = message);
    console.log(this.usernameInput+'goo2');
    this.userService.currentError.subscribe(value => this.errorMessage = value);
  }

  /*
  [onEnter] method accepts a string from an input element.
  [onEnter] method handles validation of the input element.
    -If the content (entered by the user) within the input element passes validation.
    -Then that value is assigned to variable [usernameInput] and passed to [getUser] service method.
  */
  onEnter(value: string) {
    if(value == '')
    {
      this.reposClicked = false;
      this.usernameBlank = true;
      this.usernameEntered = false;
      this.errorMessage = '';
    }
    if(value != '')
    {
      this.reposClicked = false;
      this.usernameBlank = false;
      this.usernameEntered = true;
      this.errorMessage = '';
      this.usernameInput = value;

      this.userService.changeMessage(value);

      this.userService.getUser(this.usernameInput)
        .subscribe((entered) => (this.usernameInput = entered),
        (error) => {(this.errorMessage) = 'Username was not found.', this.usernameEntered = false;
      });
    }
  }

  /*
  [onClick] method is created for the 'View Repositories' link/button (on html page).
  [onClick] toggles boolean variables to reveal the current user's repositories.
  */
  onClick() {
    this.reposClicked = true;
    this.usernameEntered = false;
    this.userService.changeMessage(this.usernameInput);
    this.messageEvent.emit(this.usernameInput);
  }

  sendMessage(){
    this.messageEvent.emit(this.usernameInput);
  }
}