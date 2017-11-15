import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent, SearchBarComponent, UserDetailComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
