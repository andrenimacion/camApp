import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Iwebuser } from 'src/Models/webUser';

@Injectable({
  providedIn: 'root'
})
export class WebuserService {

  private apiURL = this.baseUrl + "api/User";
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
    
  login(user: Iwebuser): Observable<boolean> {
    return this.http.post<boolean>(this.apiURL + "/login", user);
  }

  create(user: Iwebuser): Observable<Iwebuser> {
    return this.http.post<Iwebuser>(this.apiURL + "/create", user);
  }

  //create(userInfo: Iwebuser): Observable<Iwebuser> {
  //  return this.http.post<Iwebuser>(this.apiURL + "/create", userInfo);
  //}
}
