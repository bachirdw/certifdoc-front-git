import { Injectable } from '@angular/core';
import { AppSettings } from '../../settings/app.settings';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user';
import { UserRole } from '../../models/enum/enum';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private loggedIn = false;
  private userEmail = '';
  private userRole: UserRole = UserRole.FORMATEUR; // valeur par défaut

  login(email: string, role: UserRole) {
    this.loggedIn = true;
    this.userEmail = email;
    this.userRole = role;
  }

  logout() {
    this.loggedIn = false;
    this.userEmail = '';
    this.userRole = UserRole.FORMATEUR; // valeur par défaut
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUserEmail(): string {
    return this.userEmail;
  }

  getUserRole(): UserRole {
    return this.userRole;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.userRole === UserRole.ADMIN;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
