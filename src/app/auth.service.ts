// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'browpay-api-endpoint';
  private token = 'Your-secret-key';

  constructor(private http: HttpClient) { }

  authenticate(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.post<any>(`${this.apiUrl}/api/User/Login`, { EmailId: email, Password: password }, { headers });
  }
}
