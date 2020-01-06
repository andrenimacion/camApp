import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Idp03a130 } from 'src/Models/Dp03a130';

@Injectable({
  providedIn: 'root'
})
export class Dp03a130Service {

  private apiURL = this.baseUrl + "api/Dp03a130";
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getPiscinas(codcam:string): Observable<Idp03a130[]> {

    return this.http.get<Idp03a130[]>(this.apiURL + "/GetPiscinas/" + codcam);
  }
}
