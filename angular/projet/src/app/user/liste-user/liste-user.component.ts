import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
// import { UserModels } from '../../models/user.models';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.css']
})
export class ListeUserComponent implements OnInit {

  userResult: any;
  userList: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(){
    this.userService.get_All_User()
    .subscribe(
      userResult => {
        this.userResult = userResult;
        console.log(this.userList);
    });
  }

}
