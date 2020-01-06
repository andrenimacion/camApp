import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { WebuserService } from 'src/Servicios/webuser.service';
import { Router } from '@angular/router';
import { Template } from '@angular/compiler/src/render3/r3_ast';


@Component({
  selector: 'app-sup-header',
  templateUrl: './sup-header.component.html',
  styleUrls: ['./sup-header.component.css']
})

export class SupHeaderComponent implements OnInit {

  public env = environment;
  public subMenu = false;

  constructor(public userService: WebuserService,
    public router: Router) {
  }

  ngOnInit() { }

  logOut() {
    this.userService.logout();
    this.router.navigate(['\login']);
    this.env.header = false;
  }

  historyRoute() {
    this.router.navigate(['\history']);
  }

  //tiempo y fechas variables
  public fecha: any= new Date();
  public getHoras: number = this.fecha.getHours();
  public getMinutos: number = this.fecha.getMinutes();
  public getDias: string = this.fecha.getDay();
  public getMes: string = this.fecha.getMonth();
  public getAño: string = this.fecha.getFullYear();
  public mes: Array<string> = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  public semana: Array<string> = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  date() {
    //Semana[f.getDay()] 
    //f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear()
    return  "Fecha: " + this.semana[this.fecha.getDay()-1] + " "  + this.fecha.getDate() + " de " + this.mes[this.fecha.getMonth()] + " del " + this.fecha.getFullYear();
  }

}
