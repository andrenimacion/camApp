import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebuserService } from 'src/Servicios/webuser.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(public userService: WebuserService,
    public router: Router) { }

  ngOnInit() {
    if (!this.userService.estaLogueado()) {
      this.router.navigate(['\login']);
    }
  }

  logOut() {
    this.userService.logout();
    this.router.navigate(['\login']);
  }
}
