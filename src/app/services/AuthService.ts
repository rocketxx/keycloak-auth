import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private keycloakService: KeycloakService,private router: Router) {}
    userInfo : any = null;
  logout() {
    // Esegui il logout di Keycloak
    this.keycloakService.logout().then(() => {
      // Reindirizza l'utente a una pagina di login o alla home page
      this.router.navigate(['/']); // Puoi reindirizzare dove vuoi
    }).catch((error) => {
      console.error("Errore durante il logout:", error);
    });
  }

  getUserInfo() {
    // Esegui il logout di Keycloak
    var userInfo = this.keycloakService.loadUserProfile().then(() => {
        
    }).catch((error) => {
      console.error("Errore durante caricamento dati utente:", error);
    });
  }
}
