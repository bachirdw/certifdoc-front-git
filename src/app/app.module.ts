import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/utilisateur/user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { DocumentComponent } from './components/document/document.component';
import { DossierAuditComponent } from './components/dossier-audit/dossier-audit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HeaderComponent,
    UserComponent,
    RegisterComponent,
    DocumentComponent,
    DossierAuditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,//  Pour ngModel
    AppRoutingModule,
    ReactiveFormsModule     // ✅ Pour formControlName
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
