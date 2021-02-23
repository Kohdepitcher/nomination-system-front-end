import { Component, OnInit } from '@angular/core';

import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  constructor(public authService: AuthService,) { }

  ngOnInit() {
  }

}
