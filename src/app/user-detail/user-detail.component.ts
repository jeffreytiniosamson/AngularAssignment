import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from './user';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ErrorHandler } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  providers: [UserService],
  styleUrls: ['./user-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent implements OnInit {
  
  users:User[];
  user:User;
  usernameInput: string;
  errorMessage = '';

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.currentMessage.subscribe(message => this.usernameInput = message);
    this.userService.currentError.subscribe(value => this.errorMessage = value);
  }
}
