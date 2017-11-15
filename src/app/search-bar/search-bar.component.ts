import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user-detail/user';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
  usernameEntered = false;
  form: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.currentMessage.subscribe(message => this.usernameInput = message);
  }

  onEnter(value: string) {
    this.usernameInput = value;
    this.usernameEntered = true;

    this.userService.getUser(this.usernameInput).subscribe(entered => {
      this.usernameInput = entered;
    });
  }
}
