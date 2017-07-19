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
  rowsOnPage = 2;
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

  ngOnInit() { }

  saveUser() {
    this._userService.addUser(this.newUser).subscribe(
      value => {
        console.log(value);
        this._userService.getUser().subscribe(
          value => {
          this.users = value;
            console.log(value);
          },
          error => { console.log(error) }
        );
        this.newUser= new User();
      },
      error => { console.log(error) }
    );
  }
  editUser(){
    this._userService.editUser(this.selectedUser._id,this.selectedUser).subscribe(
      value => {
        console.log(value);
        this._userService.getUser().subscribe(
          value => {
          this.users = value;
            console.log(value);
          },
          error => { console.log(error) }
        );
        this.selectedUser=new User();
      },
      error => { console.log(error) }
    );
  }
  deleteUser(){
    this._userService.deleteUser(this.selectedUser._id).subscribe(
      value => {
        console.log(value);
        this._userService.getUser().subscribe(
          value => {
          this.users = value;
            console.log(value);
          },
          error => { console.log(error) }
        );
        this.selectedUser=new User();
      },
      error => { console.log(error) }
    );
  }

}
