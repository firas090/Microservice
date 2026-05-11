import { Component } from '@angular/core';
import { AgenceService } from 'src/app/services/agence-service/agence.service';

@Component({
  selector: 'app-agence-email',
  templateUrl: './agence-email.component.html',
  styleUrls: ['./agence-email.component.css']
})
export class AgenceEmailComponent {
  email: string = '';
  message: string = '';

  constructor(private agenceService: AgenceService) {}

  sendEmail(): void {
    this.agenceService.sendAgencesByEmail(this.email).subscribe(response => {
      this.message = response;
      this.email = '';
    }, error => {
      this.message = 'Error sending email';
    });
  }
}