import { Injectable } from '@angular/core';
import { AppSettings } from '../../settings/app.settings';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  public host = AppSettings.APP_URL;

  constructor(private http: HttpClient) {}

  public login(userData: { email: string; password: string }): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/api/auth/login`, userData, { observe: 'response' });
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/api/auth/register`, user);
  }

  public logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('users');
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  public isUserLoggedIn(): boolean {
    return this.getUserFromLocalCache() !== null;
  }
}