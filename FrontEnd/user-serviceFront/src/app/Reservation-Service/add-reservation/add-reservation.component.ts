import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {
  reservation = {
    destination: '',
    dateDepart: '',
    nombrePersonnes: 1,
    userId: null
  };

  constructor(private http: HttpClient, private router: Router) {} // ✅ injecte Router

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.reservation.userId = parsedUser.id;
      console.log("✅ ID utilisateur chargé :", this.reservation.userId);
    } else {
      console.warn("❌ Aucun utilisateur trouvé dans le localStorage");
    }
  }

  onSubmit() {
    if (!this.reservation.userId) {
      alert("Impossible d'enregistrer la réservation sans utilisateur.");
      return;
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://localhost:7000/api/reservations', this.reservation, { headers })
      .subscribe({
        next: res => {
          alert('✅ Réservation enregistrée avec succès !');
          this.router.navigate(['/reservation/list']); // ✅ Redirection ici
        },
        error: err => {
          console.error("❌ Erreur:", err);
          alert("Erreur lors de l'enregistrement.");
        }
      });
  }
}
