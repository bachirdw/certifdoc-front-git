import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentification/authentification.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { User } from '../../models/user/user';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

//Page de connexion
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{
  
  public showLoading !: boolean;
  private subscriptions : Subscription[] =[];
  public email: string = '';
  public password: string = '';
  public errorMessage: string = '';

  constructor(
    private router:Router,
    private authenticationService : AuthenticationService,
  ){}
// Initialisation du composant
  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/document');
    }
  }
// Déclenché lors de la soumission du formulaire de connexion
  public onLoginSubmit(): void {
    const userData = { email: this.email, password: this.password };
    this.onLogin(userData);
  }
// Appel du service d'authentification pour se connecter
  public onLogin(user: { email: string; password: string }): void {
    this.showLoading = true;
    console.log("Données envoyées :", user);

    this.subscriptions.push(
      this.authenticationService.login(user).subscribe({
        next: (response: HttpResponse<User>) => {
          this.authenticationService.addUserToLocalCache(response.body!);
          this.router.navigateByUrl('/document');
          this.showLoading = false;
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.log("Erreur reçue :", errorResponse);
          this.errorMessage = errorResponse.error.message || "Échec de la connexion. Vérifiez vos identifiants.";
          this.showLoading = false;
        }
      })
    );
  }
// On se désabonne pour éviter les fuites de mémoire
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}