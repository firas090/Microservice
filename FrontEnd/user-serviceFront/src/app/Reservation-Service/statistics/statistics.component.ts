import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation-service/reservation.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  stats: any;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservationService.getStatistics().subscribe({
      next: data => {
        this.stats = data;
        console.log("📊 Statistiques :", data);
      },
      error: err => {
        console.error("❌ Erreur chargement stats :", err);
      }
    });
  }
}
