import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    console.log(this.userDataService.token);
    console.log(this.userDataService.expiration);
    console.log(this.userDataService.userEmail);
  }

}
