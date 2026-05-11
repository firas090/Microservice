import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/User';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  user: User = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.signIn(this.user).subscribe({
      next: res => {
        console.log('✅ Signed in successfully!', res);

        // Stocke le token et l'utilisateur dans le localStorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        // Redirection vers la page d’accueil
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error('❌ Error:', err);
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    });
  }
}
