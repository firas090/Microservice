import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation-service/reservation.service';

@Component({
  selector: 'app-reservation-options',
  templateUrl: './reservation-options.component.html',
  styleUrls: ['./reservation-options.component.css']
})
export class ReservationOptionsComponent implements OnInit {
  reservationId!: number;
  availableOptions: string[] = [];
  selectedOptions: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.reservationId = +this.route.snapshot.paramMap.get('id')!;

    // ✅ Charger les options disponibles
    this.reservationService.getAvailableOptions(this.reservationId).subscribe(data => {
      this.availableOptions = data;
    });

    // ✅ Charger les options déjà sélectionnées (si ton backend le permet)
    if (this.reservationService.getSelectedOptions) {
      this.reservationService.getSelectedOptions(this.reservationId).subscribe({
        next: selected => {
          this.selectedOptions = selected;
        },
        error: err => {
          console.warn("⚠️ Impossible de charger les options sélectionnées :", err);
        }
      });
    }
  }

  // ✅ Gérer le changement d’état d’une option
  toggleOption(option: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
  
    if (isChecked) {
      if (!this.selectedOptions.includes(option)) {
        this.selectedOptions.push(option);
      }
    } else {
      this.selectedOptions = this.selectedOptions.filter(o => o !== option);
    }
  }
  
  

  // ✅ Sauvegarder les options sélectionnées
  saveOptions(): void {
    console.log("📤 Envoi des options :", this.selectedOptions);
  
    this.reservationService.addOptions(this.reservationId, this.selectedOptions).subscribe({
      next: () => alert("✅ Options enregistrées avec succès !"),
      error: (err) => {
        console.error("❌ Erreur lors de la sauvegarde :", err);
        alert("❌ Une erreur est survenue lors de l'enregistrement.");
      }
    });
  }
  
  
}
