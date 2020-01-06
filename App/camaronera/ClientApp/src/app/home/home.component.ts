import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebuserService } from 'src/Servicios/webuser.service';
import { environment } from 'src/environments/environment';
import { Dp13a110Service } from 'src/Servicios/dp13a110.service';
import { Idp13a110 } from 'src/Models/Dp13a110';
import { Dp03a130Service } from '../../Servicios/dp03a130.service';
import { Idp03a130 } from '../../Models/Dp03a130';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {

  env = environment;
  public dbCam: Idp13a110[] = [];
 
  constructor(
    public userService: WebuserService,
    public camServices: Dp13a110Service,
    public router: Router) { }

  ngOnInit() {
    this.camServices.getCamaroneras().subscribe(
      x => {
        this.dbCam = x;
      },
      err => console.log(err)
    );

    

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

  showtabla(codigo: string, nombre: string) {
    this.env.nameCam = nombre;
    this.env.codCam = codigo;    
    this.router.navigate(['\muestreo']);   
  }

}
