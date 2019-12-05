import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Idp13a110 } from 'src/Models/Dp13a110';

@Injectable({
  providedIn: 'root'
})
export class Dp13a110Service {

  private apiURL = this.baseUrl + "api/Dp13a110";
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getCamaroneras(): Observable<Idp13a110[]> {
    return this.http.get<Idp13a110[]>(this.apiURL + "/GetCamaroneras");
  }

}
