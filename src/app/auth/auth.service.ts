import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signup(data: any): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    const userExists = users.some((user: any) => user.email === data.email);
    if (userExists) {
      return throwError(() => new Error('User already exists'));
    }
    
    // Save new user
    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));

    // Simulate a successful server response
    return of({ message: 'User created successfully' }).pipe(
      catchError(this.handleError)
    );
  }

  login(data: any): Observable<any> {
    console.log('Login request:', data);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === data.email && u.password === data.password);
    
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
      return of({ message: 'Login successful' }).pipe(
        catchError(this.handleError)
      );
    } else {
      return throwError(() => new Error('Invalid email or password'));
    }
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
