import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebuserService } from 'src/Servicios/webuser.service';
import { Iwebuser } from 'src/Models/webUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public _Iuser: Iwebuser = { webUsu: "", webPass: "" };

  constructor(public userService: WebuserService) { }

  ngOnInit() {
    console.log(this._Iuser)    
  }

  logeo() {    
    this.userService.login(this._Iuser)
      .subscribe(x => console.log("Ingrese"), err => console.log("No Ingrese"));
  }
}
