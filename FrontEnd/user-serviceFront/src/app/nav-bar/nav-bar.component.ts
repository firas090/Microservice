import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: User | null = null;
  userInitials: string = '';
  dropdownOpen = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: User | null) => {
      this.user = user;
      if (user) {
        this.userInitials = `${user.firstname?.[0] || ''}${user.lastname?.[0] || ''}`.toUpperCase();
      } else {
        this.userInitials = '';
      }
    });
  }
  

  // ✅ Vérifie si connecté
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // ✅ Déconnexion
  logout(): void {
    this.authService.logout();
    window.location.href = '/signin';
  }

  // ✅ Retourne les initiales dynamiquement (non utilisée ici mais propre)
  getInitials(): string {
    if (!this.user) return '';
    const firstname = this.user.firstname || '';
    const lastname = this.user.lastname || '';
    return `${firstname[0] || ''}${lastname[0] || ''}`.toUpperCase();
  }

  // ✅ Toggle du dropdown
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
