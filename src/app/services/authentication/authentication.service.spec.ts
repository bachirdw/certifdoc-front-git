import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '../../models/enum/enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
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

  getUserRole(): 'FORMATEUR' | 'ADMIN' | 'AUDITEUR' {
    return this.userRole;
  }

   isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }

    getToken(): string | null {
    return localStorage.getItem('token'); // <-- méthode attendue par l'interceptor
  }
  
}