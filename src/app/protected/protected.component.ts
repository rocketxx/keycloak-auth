import { Component } from '@angular/core';
import { AuthService } from '../services/authService';

@Component({
  selector: 'app-protected',
  standalone: false,
  
  templateUrl: './protected.component.html',
  styleUrl: './protected.component.css'
})
export class ProtectedComponent {
  constructor(private auth_service:AuthService)
  {

  }

  logout() {
    this.auth_service.logout();
  }
}
