import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  
  repos: Repo[];
  usernameInput: string;
  errorMessage = '';

  constructor(private userService: UserService) {
    //'test' is a hard-coded placeholder
    this.userService.getUserRepos('test').subscribe(repos => { console.log(repos),
      this.repos = repos;
    });
  }

  ngOnInit() {
    this.userService.currentMessage.subscribe(message => this.usernameInput = message);
    this.userService.currentError.subscribe(value => this.errorMessage = value);
  }
}
