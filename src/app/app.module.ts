import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';

import { UserComponent } from './components/user/user.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { DocumentComponent } from './components/document/document.component';
import { DossierAuditComponent } from './components/dossier-audit/dossier-audit.component';
import { AdminComponent } from './components/admin/admin.component';
import { RouterModule } from '@angular/router';
import { authInterceptorFn } from './guard/interceptors/authentication.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    DocumentComponent,
    DossierAuditComponent,
    AdminComponent
  ],
  
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,    // Pour ngModel
    AppRoutingModule,
    ReactiveFormsModule,    // Pour formControlName
    RouterModule // Ajouté

  ],
  providers: [provideHttpClient(
    withInterceptors([authInterceptorFn]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
