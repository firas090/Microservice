import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  updateProfile(): void {
    if (this.user) {
      const userId = this.user.id;
  
      const updatedUser: any = { ...this.user };
      
      // ❌ Supprime le champ password si vide
      if (!updatedUser.password || updatedUser.password.trim() === '') {
        delete updatedUser.password;
      }
  
      const payload = JSON.parse(JSON.stringify(updatedUser, (key, value) =>
        value === null || value === '' ? undefined : value
      ));
  
      this.http.put(`http://localhost:8082/api/users/${userId}`, payload).subscribe({
        next: updated => {
          alert("✅ Profil mis à jour !");
          localStorage.setItem('user', JSON.stringify(updated));
          this.authService.refreshUser();
          this.router.navigate(['/home']);
        },
        error: err => {
          console.error("Erreur lors de la mise à jour du profil :", err);
          alert("❌ Erreur lors de la mise à jour du profil.");
        }
      });
    }
  }
  
}
