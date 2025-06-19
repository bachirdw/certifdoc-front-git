import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; 
import { RegisterComponent } from './components/register/register.component';
import { DocumentComponent } from './components/document/document.component';
import { DossierAuditComponent } from './components/dossier-audit/dossier-audit.component';
import { AuthenticationGuard } from './guard/authencation.guard';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'documents',
    canActivate: [AuthenticationGuard],
    component: DocumentComponent
  },
  {
    path: 'dossier-audit',
    canActivate: [AuthenticationGuard],
    component: DossierAuditComponent
  },
  {
    path: 'user',
    canActivate: [AuthenticationGuard],
    component: UserComponent
  },
  {
    path: 'admin',
    canActivate: [AuthenticationGuard],
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }