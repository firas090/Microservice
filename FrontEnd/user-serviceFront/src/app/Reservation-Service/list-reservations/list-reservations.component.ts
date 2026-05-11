import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation-service/reservation.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.css']
})
export class ListReservationsComponent implements OnInit {
  reservations: any[] = [];
  userId: number = 0;

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user?.id;

    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getAllReservations().subscribe({
      next: data => {
        // ✅ Filtrer les réservations par userId
        this.reservations = data.filter(r => r.userId === this.userId);
        console.log("✅ Réservations filtrées :", this.reservations);
      },
      error: err => {
        console.error('❌ Erreur lors du chargement des réservations', err);
      }
    });
  }

  deleteReservation(id: number): void {
    if (confirm('❗ Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.reservationService.deleteReservation(id).subscribe({
        next: () => {
          alert('✅ Réservation supprimée avec succès.');
          this.loadReservations(); // Recharge la liste après suppression
        },
        error: err => {
          console.error('❌ Erreur lors de la suppression :', err);
          alert("Erreur lors de la suppression de la réservation.");
        }
      });
    }
  }

  editReservation(reservation: any): void {
    this.router.navigate(['/reservation/edit', reservation.id]);
  }
  download(resId: number): void {
    this.reservationService.downloadTicket(resId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ticket-${resId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  
  
}
