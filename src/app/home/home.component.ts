import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{


  constructor(private keycloakService: KeycloakService,private router: Router)
  {

  }
  ngOnInit(): void {
    
    throw new Error('Method not implemented.');
  }

  logout() {
    // Esegui il logout di Keycloak
    this.keycloakService.logout().then(() => {
      // Reindirizza l'utente a una pagina di login o alla home page
      this.router.navigate(['/']); // Puoi reindirizzare dove vuoi
    }).catch((error) => {
      console.error("Errore durante il logout:", error);
    });
  }



}
