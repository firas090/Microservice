import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Importation du Router et ActivatedRoute
import { TransportService } from '../../services/transport-service/transport-service.service';
import { Transport } from 'src/app/models/transport';

@Component({
  selector: 'app-edit-transport',
  templateUrl: './edit-transport.component.html',
  styleUrls: ['./edit-transport.component.css']
})
export class EditTransportComponent implements OnInit {
  transport: Transport = {
    id: '',
    voyageId: '',
    type: '',
    compagnie: '',
    capacite: 0,
    numero: '',
    villeDepart: '',
    villeArrivee: '',
    dateDepart: '',
    dateArrivee: '',
    prix: 0,
    userId: 0
  };

  constructor(
    private transportService: TransportService,
    private route: ActivatedRoute,  // Pour récupérer l'ID du transport
    private router: Router  // Pour rediriger après la modification
  ) {}

  ngOnInit(): void {
    const transportId = this.route.snapshot.paramMap.get('id');  // Récupère l'ID du transport
    if (transportId) {
      this.transportService.getTransportById(transportId).subscribe(
        (data) => {
          this.transport = data;  // Remplir le formulaire avec les données existantes
        },
        (error) => {
          console.error('Erreur lors de la récupération du transport', error);
        }
      );
    }
  }

  // Méthode pour modifier un transport
  editTransport(): void {
    const transportId = this.transport.id || '';  // Utiliser une valeur par défaut si l'id est undefined
  
    if (!transportId) {
      console.error('Transport ID est manquant');
      return; // Arrêter l'exécution si l'id est indéfini
    }
  
    this.transportService.updateTransport(transportId, this.transport).subscribe(
      (data) => {
        console.log('Transport mis à jour avec succès');
        this.router.navigate(['/transports']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du transport', error);
      }
    );
  }
  
}
