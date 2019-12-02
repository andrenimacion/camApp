import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebuserService } from 'src/Servicios/webuser.service';
import { Iwebuser } from 'src/Models/webUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public _Iuser: Iwebuser = { webUsu: "", webPass: "" };

  constructor(public userService: WebuserService,
              public router: Router) { }

  ngOnInit() {
    if (this.userService.estaLogueado()) {
      this.router.navigate(['\home']);
    }
  }

  logeo() {    
    this.userService.login(this._Iuser)
      .subscribe(x => {
        localStorage.setItem('token',x.webUsu);
        localStorage.setItem('tokenExpiration', "Falta para token");
        this.router.navigate(['\home']);
      }, err => alert("Clave incorrecta"));
  }  
}
