import { Component } from '@angular/core';
import { AvisService } from 'src/app/services/avis-service/avis.service';
import { Avis } from 'src/app/models/Avis';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-avis',
  templateUrl: './add-avis.component.html',
  styleUrls: ['./add-avis.component.css']
})
export class AddAvisComponent {
  avis: Avis = {
    id: 0, // Ou une autre valeur par défaut
    utilisateurId: 0, // sera assigné automatiquement
    voyageId: 0,
    note: 0,
    commentaire: ''
  };


  
  showToast: boolean = false;
  stars: number[] = [1, 2, 3, 4, 5];
  avisList: Avis[] = [];


  constructor(
    public avisService: AvisService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId(); // ou le récupérer depuis localStorage par ex.
    this.avis.utilisateurId = userId;
    this.getAvis();
  }
 
  
  onSubmit(): void {
    this.avis.id = this.avis.id || 0; // Assurer que l'id est défini, même à 0
  
    this.avisService.createAvis(this.avis).subscribe({
      next: () => {
        console.log('Avis ajouté avec succès !');
        this.showSuccessToast(); 
        this.avis = { id: 0, voyageId: 0, note: 0, commentaire: '' }; // Remettre à zéro après ajout
        this.getAvis();
        this.router.navigate(['/avis']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de l\'avis :', err);
        alert('Erreur lors de l\'ajout.');
      }
    });
  }
  


setRating(value: number): void {
  this.avis.note = value;
}



// getAvis(): void {
//   this.avisService.getAllAvis().subscribe({
//     next: (data) => {
//       this.avisList = data;
//     },
//     error: (err) => {
//       console.error('Erreur lors du chargement des avis :', err);
//     }
//   });
// }

getAvis(): void {
  const userId = this.authService.getCurrentUserId(); // ou depuis le token/localStorage
  this.avisService.getAvisByUserId(userId).subscribe({
    next: (data) => {
      this.avisList = data;
    },
    error: (err) => {
      console.error('Erreur lors du chargement des avis utilisateur :', err);
    }
  });
}

showSuccessToast(): void {
  this.showToast = true;
  setTimeout(() => {
    this.showToast = false;
  }, 6000); // auto-hide after 3s
}

closeToast(): void {
  this.showToast = false;
}
editAvis(avis: Avis): void {
  if (avis.id !== undefined) {  // Vérifie si `id` est défini
    this.router.navigate(['/edit-avis', avis.id]);
  } else {
    console.error("ID de l'avis non défini");
  }
}


deleteAvis(id: number): void {
  if (id !== undefined) {  // Vérifie si `id` est défini
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment supprimer cet avis ? Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.avisService.deleteAvis(id).subscribe({
          next: () => {
            Swal.fire(
              'Supprimé !',
              'L\'avis a été supprimé.',
              'success'
            );
            this.getAvis(); // Recharger la liste après suppression
          },
          error: (err) => {
            Swal.fire(
              'Erreur !',
              'Une erreur s\'est produite lors de la suppression de l\'avis.',
              'error'
            );
            console.error('Erreur lors de la suppression de l\'avis :', err);
          }
        });
      }
    });
  } else {
    console.error("ID de l'avis non défini");
  }
}

}

