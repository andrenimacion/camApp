import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDpinvcab } from 'src/models/dpinvcab';

@Injectable({
  providedIn: 'root'
})
export class DpinvcabService {
  private apiURL = this.baseUrl + "api/DPINVCAB";
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  saveInvCab(cabeza: IDpinvcab): Observable<IDpinvcab> {
    return this.http.post<IDpinvcab>(this.apiURL + "/CreateInvCab" , cabeza);
  }
}
