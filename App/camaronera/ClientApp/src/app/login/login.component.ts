import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebuserService } from 'src/Servicios/webuser.service';
import { Iwebuser } from 'src/Models/webUser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public _Iuser: Iwebuser = { webUsu: "", webPass: "" };
  env = environment;

  constructor(public userService: WebuserService,
              public router: Router) { }

  ngOnInit() {
    if (this.userService.estaLogueado()) {
      this.env.header = true;
      this.router.navigate(['\home']);      
    }
  }

  logeo() {    
    this.userService.login(this._Iuser)
      .subscribe(x => {
        this.env.header = true;
        this.env.nameUser = x.webUsu;
        localStorage.setItem('token',x.webUsu);
        localStorage.setItem('tokenExpiration', "Falta para token");
        this.router.navigate(['\home']);
      }, err => alert("Clave incorrecta"));
  }  
}
