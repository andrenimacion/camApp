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
    
  login(user: Iwebuser): Observable<Iwebuser> {
    return this.http.post<Iwebuser>(this.apiURL + "/login", user);
  }

  create(user: Iwebuser): Observable<Iwebuser> {
    return this.http.post<Iwebuser>(this.apiURL + "/create", user);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
  }

  estaLogueado(): boolean {

    var exp = this.obtenerExistenciaToken();

    if (!exp) {
      // el token no existe
      return false;
    }
     else {
      return true;
    }
  }

  obtenerExistenciaToken(): string {
    return localStorage.getItem("token");
  }
}
