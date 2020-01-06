import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISp_Numsecu } from '../Models/sp_Numsecu';

@Injectable({
  providedIn: 'root'
})
export class SentenciasService {

  private apiURL = this.baseUrl + "api/sentencias";
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  secuancia(spNumsec: ISp_Numsecu): Observable<string> {
    return this.http.post<string>(this.apiURL + "/secuencia", spNumsec);
  }

  getTalla(opcionA: number, opcionB: number): Observable<any> {
  return this.http.get<any>(this.apiURL + "/getTalla/" + opcionA + "/" + opcionB);
}

  getHist(dateA: Date, dateB: Date): Observable<any> {
    return this.http.get<any>(this.apiURL + "/GetHist/" + dateA+ "/" + dateB);
  }

}
