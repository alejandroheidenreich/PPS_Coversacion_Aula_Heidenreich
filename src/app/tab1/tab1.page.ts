import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(private auth: AuthService, private router: Router) { }
  ngOnInit(): void {

  }


  chat1() {
    this.router.navigate(['tabs/tab2']);
  }

  chat2() {
    this.router.navigate(['tabs/tab3']);
  }


  logOut() {
    setTimeout(() => {

      this.auth.logout();
    }, 3000);
  }

}
