import { inject } from "@angular/core";
import { CanActivateChildFn, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication/authentication.service";


// Empêche les utilisateurs non authentifiés d'accéder à des pages protégées
/*export const AuthenticationGuard: CanActivateChildFn = () => {
    const auth: boolean = inject(AuthenticationService).isUserLoggedIn();

    if (!auth) {
        inject(Router).navigate(['']); // Redirige vers l'accueil
    }

    return auth;
};*/

export const AuthenticationGuard: CanActivateChildFn = () => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);
// si l'utilisateur est connecté, autorise l'accès
    if (authService.isLoggedIn()) {
    return true;
  }

    
    router.navigate(['/login']);
    return false;
};