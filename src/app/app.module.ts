import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppAuthGuard, AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from '../enviroments/environment';
import { HomeComponent } from './home/home.component';
import { ProtectedComponent } from './protected/protected.component';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
      initOptions: {
        onLoad: 'login-required', // O 'check-sso'
        checkLoginIframe: false,  // Disabilita il controllo dell'iframe
      },
    });
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule
  ],
  providers: [
    AppAuthGuard, // Aggiungi qui la guardia
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
