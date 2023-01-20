import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './authentification/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthInterceptorProvider } from './authentification/auth.interceptor';
import { LogoutComponent } from './authentification/logout/logout.component';
import { HeaderFinancierComponent } from './header-financier/header-financier.component';
import { FooterFinancierComponent } from './footer-financier/footer-financier.component';
import { SidebarFinancierComponent } from './sidebar-financier/sidebar-financier.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    LogoutComponent,
    HeaderFinancierComponent,
    FooterFinancierComponent,
    SidebarFinancierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
