import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ErrorHandler } from '@angular/core';
import { UserService } from '../services/user.service';
import { Repo } from './repo';

@Component({
  selector: 'app-user-repo',
  templateUrl: './user-repo.component.html',
  providers: [UserService],
  styleUrls: ['./user-repo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserRepoComponent implements OnInit {

  @Input() usernameInput: string;
  repos: Repo[];

  errorMessage = '';

  constructor(public userService: UserService) {
    this.userService.currentMessage.subscribe(message => this.usernameInput = message);
    this.userService.currentError.subscribe(value => this.errorMessage = value);

    /*
    ***DEVELOPER NOTES***
     The following argument of 'this.usernameInput' in [getUsersRepos] method
    returns the repositories of a username that is hard-coded in the userService.
    Which means that in this component the value of 'this.usernameInput' is not
    properly recognized from the value entered in the [search-bar] component. 
    */
    this.userService.getUserRepos(this.usernameInput).subscribe(repos => { console.log("Loading Repositories"),
      this.repos = repos;
    });
  }
  ngOnInit() {

  }
}
