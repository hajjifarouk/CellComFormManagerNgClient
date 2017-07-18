import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  filterQuery = "";
  rowsOnPage = 5;
  private users: Array<User> = [];
  private newUser: User;
  private selectedUser: User;
  constructor(private _userService: UserService) {
    this.newUser = new User();
    this.selectedUser = new User();
    this._userService.getUser().subscribe(
      value => { this.users = value; console.log(value); },
      error => { console.log(error) }
    );

  }

  ngOnInit() {
  }

}
