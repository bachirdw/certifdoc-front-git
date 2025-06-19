import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { User } from '../../models/user/user';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserService } from '../../services/user/user.service';

//Page de connexion
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

    onSubmit() {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;

     this.userService.login(email, password).subscribe({
      next: (user: User | null) => {
        
  if (user) {
    this.authenticationService.login(user.email, user.role); // stocke email et rôle
    //redirection selon le rôle de l'utilisateur
    if (user.role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/documents']);
    }
  } else {
    this.errorMessage = "Utilisateur introuvable.";
  }
},
      error: () => {
        this.errorMessage = "Email ou mot de passe incorrect";
      }
    });
  }
  }
}

