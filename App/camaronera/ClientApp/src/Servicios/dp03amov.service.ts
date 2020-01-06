import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDp03amov } from 'src/models/dp03amov';

@Injectable({
  providedIn: 'root'
})
export class Dp03amovService {
  private apiURL = this.baseUrl + "api/DP03AMOV";
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  saveInvDet(cabeza: IDp03amov): Observable<IDp03amov> {
    return this.http.post<IDp03amov>(this.apiURL + "/CreateInvDet", cabeza);
  }
}
