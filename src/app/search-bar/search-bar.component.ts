import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  usernameEntered: boolean;
  usernameBlank: boolean;
  reposClicked: boolean;

  errorMessage = "";

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.currentMessage.subscribe(message => this.usernameInput = message);
    this.userService.currentError.subscribe(value => this.errorMessage = value);
  }

  onEnter(value: string) {
    if(value == '')
    {
      this.usernameBlank = true;
      this.usernameEntered = false;
      this.errorMessage = '';
    }
    if(value != '')
    {
      this.usernameBlank = false;
      this.usernameEntered = true;
      this.errorMessage = '';
      this.usernameInput = value;
      
      this.userService.getUser(this.usernameInput)
        .subscribe((entered) => (this.usernameInput = entered),
        (error) => {(this.errorMessage) = 'Username was not found.', this.usernameEntered = false;
      });
    }
  }

  onClick() {
    this.reposClicked = true;
    this.usernameEntered = false;
  }
}