import { Injectable } from '@angular/core';
import { AppSettings } from '../../settings/app.settings';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host = AppSettings.APP_URL;

  constructor(
    private http: HttpClient
  ) { }

  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/api/auth/login`, user, { observe: 'response' });
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

  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  public isUserLoggedIn(): boolean {
    // Pour l'instant, on retourne juste false pour forcer la connexion à chaque fois
    return false;
  }
}
