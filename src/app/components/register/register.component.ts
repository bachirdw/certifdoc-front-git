import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentification/authentification.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {

  public showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  // Ajoute ces propriétés pour le binding ngModel
  public firstname: string = '';
  public lastname: string = '';
  public email: string = '';
  public password: string = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user/management');
    }
  }

  public onRegisterSubmit(): void {
    // Crée un nouvel utilisateur à partir des champs du formulaire
    const user: User = new User();
    user.firstname = this.firstname;
    user.lastname = this.lastname;
    user.email = this.email;
    user.password = this.password;

    this.onRegister(user);
  }

  public onRegister(user: User): void {
    this.showLoading = true;

    this.subscriptions.push(
      this.authenticationService.register(user).subscribe({
        next: (data: User) => {
          this.showLoading = false;
          // Redirection ou message de succès ici si besoin
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.showLoading = false;
          // Message d'erreur ici si besoin
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      sub => sub.unsubscribe()
    );
  }
}