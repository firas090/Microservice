// list-transport.component.ts
import { Component, OnInit } from '@angular/core';
import { TransportService } from '../../services/transport-service/transport-service.service';
import { Transport } from 'src/app/models/transport';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-transports',
  templateUrl: './list-transport.component.html',
  styleUrls: ['./list-transport.component.css']
})
export class ListTransportComponent implements OnInit {
  transports: Transport[] = [];

  constructor(private transportService: TransportService) {}

  ngOnInit(): void {
    this.loadTransports();
  }

  loadTransports(): void {
    this.transportService.getAllTransports().subscribe(
      (data) => {
        console.log('Données récupérées:', data);  // Vérifier les données récupérées
        this.transports = data;  // Mettre à jour la liste des transports
      },
      (error) => {
        console.error('Erreur lors du chargement des transports', error);
      }
    );
  }
  
  // Méthode pour supprimer un transport
  deleteTransport(id: string): void {
    if (!id) {
      console.error('Transport ID est manquant');
      return;
    }

    // Afficher une alerte avec SweetAlert2 avant de supprimer
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.transportService.deleteTransport(id).subscribe(
          () => {
            Swal.fire('Supprimé!', 'Le transport a été supprimé.', 'success');
            this.loadTransports();  // Rafraîchir la liste des transports après suppression
          },
          (error) => {
            Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression.', 'error');
          }
        );
      } else {
        Swal.fire('Annulé', 'La suppression a été annulée.', 'info');
      }
    });
  }
  
}
