import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentification/authentification.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { HttpResponse } from '@angular/common/http';

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

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigateByUrl('/user/management');  
    } else{
      this.router.navigateByUrl('/login');
    }
  }

  public onLoginSubmit(): void {
    const user: User = new User();
    user.email = this.email;
    user.password = this.password;
    this.onLogin(user);
  }

  public onLogin(user:User):void {
    this.showLoading = true;

    this.subscriptions.push(
      this.authenticationService.login(user).subscribe({
        next: (response:HttpResponse<User>) =>{
          this.authenticationService.addUserToLocalCache(response.body!);
          this.router.navigateByUrl('/user/management');
          this.showLoading = false;
        },
        error: () => {
          this.errorMessage = "Échec de la connexion. Vérifiez vos identifiants.";
          this.showLoading = false;
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