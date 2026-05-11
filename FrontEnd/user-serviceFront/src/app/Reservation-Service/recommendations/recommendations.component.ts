import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation-service/reservation.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  recommendations: string[] = [];

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.reservationService.getRecommendations(userId).subscribe({
        next: (data) => {
          this.recommendations = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des recommandations', err);
        }
      });
    }
  }
}
