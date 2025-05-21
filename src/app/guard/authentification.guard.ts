import { inject } from "@angular/core";
import { CanActivateChildFn, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentification/authentification.service";


// Empêche les utilisateurs non authentifiés d'accéder à des pages protégées
export const AuthentificationGuard: CanActivateChildFn = () => {
    const auth: boolean = inject(AuthenticationService).isUserLoggedIn();

    if (!auth) {
        inject(Router).navigate(['']); // Redirige vers l'accueil
    }

    return auth;
};