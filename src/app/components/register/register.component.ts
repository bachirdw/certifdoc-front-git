import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../models/user/user';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { UserRole } from '../../models/enum/enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  formation: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
  const user = new User();

  user.firstname = this.firstname;
  user.lastname = this.lastname;
  user.email = this.email;
  user.password = this.password;
  user.formationId = Number(this.formation);
  user.role = UserRole.FORMATEUR;

  this.userService.register(user).subscribe({
    next: (response) => {
      console.log('Utilisateur enregistré:', response);
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error('Erreur d’inscription:', err);
    }
  });
}

  }

