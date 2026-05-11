import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  user: User = { firstname: '', lastname: '', email: '', password: '',role: '',  };

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.signUp(this.user).subscribe({
      next: res => console.log('Signed up successfully!', res),
      error: err => console.error('Error:', err)
    });
  }
}
