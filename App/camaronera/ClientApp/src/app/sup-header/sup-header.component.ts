import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { WebuserService } from 'src/Servicios/webuser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sup-header',
  templateUrl: './sup-header.component.html',
  styleUrls: ['./sup-header.component.css']
})
export class SupHeaderComponent implements OnInit {

    public env = environment;
    public subMenu = false;

  constructor(public userService: WebuserService,
    public router: Router) { }

  ngOnInit() { }

  logOut() {
    this.userService.logout();
    this.router.navigate(['\login']);
    this.env.header = false;
  }

}
