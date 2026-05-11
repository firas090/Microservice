import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation-service/reservation.service';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {
  reservationId!: number;
  reservation: any = {
    destination: '',
    dateDepart: '',
    nombrePersonnes: 1,
    userId: null
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.reservationId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadReservation();
  }

  loadReservation(): void {
    this.reservationService.getReservationById(this.reservationId).subscribe({
      next: data => {
        this.reservation = data;
      },
      error: err => {
        console.error('Erreur lors du chargement de la réservation', err);
      }
    });
  }

  onSubmit(): void {
    this.reservationService.updateReservation(this.reservationId, this.reservation).subscribe({
      next: () => {
        alert('Réservation modifiée avec succès !');
        this.router.navigate(['/reservation/list']);
      },
      error: err => {
        console.error('Erreur lors de la modification', err);
        alert('Erreur lors de la modification de la réservation.');
      }
    });
  }
}
