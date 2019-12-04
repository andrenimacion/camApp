import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { WebuserService } from 'src/Servicios/webuser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  env = environment;

  constructor(public userService: WebuserService) { }

  ngOnInit() {    
    if (this.userService.estaLogueado()) {
      this.env.header = true;
      this.env.nameUser = localStorage.getItem("token");
    }
  }
}
