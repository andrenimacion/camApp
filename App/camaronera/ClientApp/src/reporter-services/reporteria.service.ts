import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteriaService {

  private apiURL = this.baseUrl + "api/sentencias";
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getReporte(tipo: string, numero: string): Observable<any> {
    return this.http.get<any>(this.apiURL + "/getPrint/" + tipo + "/" + numero);
  }

}
