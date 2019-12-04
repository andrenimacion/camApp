import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebuserService } from 'src/Servicios/webuser.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  env = environment;

  constructor(public userService: WebuserService,
    public router: Router) { }

  ngOnInit() {
    this.env.header = true;
    if (!this.userService.estaLogueado()) {
      this.router.navigate(['\login']);
      this.env.header = false;
    }
  }

  logOut() {
    this.userService.logout();
    this.router.navigate(['\login']);
    this.env.header = false;
  }
}
