import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Idp03a110 } from '../Models/Dp03a110';

@Injectable({
  providedIn: 'root'
})
export class Dp03a110Service {

  private apiURL = this.baseUrl + "api/Dp03a110";
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getCamaroneras(): Observable<Idp03a110[]> {
    return this.http.get<Idp03a110[]>(this.apiURL + "/GetProductos");
  }


  getCodigoCamaroneras(codigoProducto: string): Observable<Idp03a110> {
    return this.http.get<Idp03a110>(this.apiURL + "/GetProductoByCodigo/" + codigoProducto);
  }

}
