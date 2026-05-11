import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importation du Router
import { TransportService } from '../../services/transport-service/transport-service.service';
import { Transport } from 'src/app/models/transport';

@Component({
  selector: 'app-add-transport',
  templateUrl: './add-transport.component.html',
  styleUrls: ['./add-transport.component.css']
})
export class AddTransportComponent  {
    transport: Transport = {
       
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
        userId: 1,  // Vous pouvez ajuster l'ID de l'utilisateur en fonction de l'utilisateur connecté
      };
    
      constructor(private transportService: TransportService, private router: Router) { }
    
      // Méthode pour soumettre le formulaire et ajouter le transport
      // AddTransportComponent (frontend)
onSubmit(): void {
    this.transportService.addTransport(this.transport).subscribe(
      (response) => {
        console.log('Transport ajouté avec succès', response);
        this.router.navigate(['/transports']); // Redirige après ajout
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du transport', error);
      }
    );
  }
  
    

}
