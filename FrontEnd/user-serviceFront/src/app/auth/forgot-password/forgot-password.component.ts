import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  
    email: string = '';
  
    constructor(private authService: AuthService) {}
  
    onSubmit(): void {
      this.authService.sendResetPasswordEmail(this.email).subscribe({
        next: res => {
          console.log('Password reset link sent');
          // Afficher un message de confirmation
        },
        error: err => {
          console.error('Error:', err);
        }
      });
    }

}
