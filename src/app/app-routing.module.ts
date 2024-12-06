import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { HomeComponent } from './home/home.component'; // Sostituire con i tuoi componenti
import { ProtectedComponent } from './protected/protected.component'; // Sostituire con i tuoi componenti
import { Router } from '@angular/router';
@Injectable()
class AppAuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override keycloakAngular: KeycloakService,
    protected override router: Router
  ) {
    super(router,keycloakAngular);
  }

  isAccessAllowed(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.authenticated) {
        // Se non autenticato, reindirizza al login di Keycloak
        this.keycloakAngular.login();
        resolve(false);
      } else {
        // Qui puoi controllare eventuali ruoli o altri permessi se necessario
        resolve(true);
      }
    });
  }
}

const routes: Routes = [
  { path: '', component: HomeComponent }, // Rotta pubblica
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [AppAuthGuard], // Rotta protetta da Keycloak
  },
  { path: '**', redirectTo: '' }, // Rotta di fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard], // Registra la guardia
})
export class AppRoutingModule {}
