import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { HomeComponent } from './home/home.component'; // Sostituire con i tuoi componenti
import { ProtectedComponent } from './protected/protected.component'; // Sostituire con i tuoi componenti
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root', // Puoi usare 'root' o lasciare il provider esplicito nel modulo
})
export class AppAuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override keycloakAngular: KeycloakService,
    protected override router: Router
  ) {
    super(router,keycloakAngular);
  }

  // isAccessAllowed(): Promise<boolean> {
  //   return new Promise(async (resolve, reject) => {
  //     if (!this.authenticated) {
  //       // Se non autenticato, reindirizza al login di Keycloak
  //       this.keycloakAngular.login();
  //       resolve(false);
  //     } else {
  //       // Qui puoi controllare eventuali ruoli o altri permessi se necessario
  //       resolve(true);
  //     }
  //   });

  //   /*
  //   // commenta la promise sopra e decommenta se vuoi sviluppare senza login attivo:
  //       return new Promise(async (resolve, reject) => {

  //       resolve(true);
  //   });
  //   */
  // }
  isAccessAllowed(): Promise<boolean> {
    // debugger
    return new Promise(async (resolve, reject) => {
      debugger
      if (!this.authenticated) {
        // Se non autenticato, reindirizza al login di Keycloak
        await this.keycloakAngular.login();
        resolve(false);
      } else {
        // Controllo dei ruoli
        const roles = this.keycloakAngular.getUserRoles();
        if (roles.includes('adminRole')) {
          // Ruolo admin: reindirizza a ProtectedComponent
          window.alert("Ciao admin");
          resolve(true)
        } else if (roles.includes('userRole')) {
          // Ruolo user: reindirizza a HomeComponent
          window.alert("Ciao admin");
          resolve(true)
          this.router.navigate(['/home']);
        } else {
          // Nessun ruolo appropriato: reindirizza a una pagina di errore o Home
          this.router.navigate(['/']);
        }
        resolve(false); // Blocca l'accesso diretto alla rotta protetta
      }
    });
  }
  
}

// const routes: Routes = [
//   { path: '', component: HomeComponent }, // Rotta pubblica
//   {
//     path: 'protected',
//     component: ProtectedComponent,
//     canActivate: [AppAuthGuard], // Rotta protetta da Keycloak
//   },
//   { path: '**', redirectTo: '' }, // Rotta di fallback
// ];
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [AppAuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard], // Registra la guardia
})
export class AppRoutingModule {}
