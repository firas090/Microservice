import { Component } from '@angular/core';
import { AvisService } from 'src/app/services/avis-service/avis.service';
import { Avis } from 'src/app/models/Avis';
import { AuthService } from 'src/app/services/auth.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-list-all-avis',
  templateUrl: './list-all-avis.component.html',
  styleUrls: ['./list-all-avis.component.css']
})
export class ListAllAvisComponent {
  avisList: Avis[] = [];
  keyword: string = ''; // Pour stocker le mot-clé de recherche
  voyageId: number | null = null; // Pour stocker l'ID du voyage
  approuve: boolean | null = null; // Pour stocker le statut d'approbation
  constructor(private avisService: AvisService,public authService: AuthService) {}

  ngOnInit(): void {
    this.getAvis(); // Récupérer les avis au chargement
  }

  // getAvis(): void {
  //   this.avisService.getAllAvis().subscribe({
  //     next: (data) => {
  //       this.avisList = data; // Stocker tous les avis dans la liste
  //     },
  //     error: (err) => {
  //       console.error('Erreur lors du chargement des avis :', err);
  //     }
  //   });
  // }

  getAvis(): void {
    // Appel à la méthode de recherche avec les critères de recherche
    this.avisService.getAvisBySearch(this.keyword, this.voyageId, this.approuve).subscribe({
      next: (data) => {
        this.avisList = data; // Mettre à jour la liste des avis
      },
      error: (err) => {
        console.error('Erreur lors du chargement des avis :', err);
      }
    });
  }
  onSearch(): void {
    this.getAvis(); // Récupérer les avis en fonction des critères de recherche
  }

   // Ajouter une réaction (like/dislike)
   ajouterReaction(avisId: number, liked: boolean): void {
    const userId = this.authService.getCurrentUserId(); // Récupérer l'ID de l'utilisateur dans la méthode
    this.avisService.ajouterReaction(avisId, userId, liked).subscribe({
      next: (reaction) => {
        console.log('Réaction ajoutée avec succès !');
        this.getAvis();  // Recharger la liste après la réaction
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de la réaction :', err);
      }
    });
  }


  downloadAsPdf(): void {
    const doc = new jsPDF();
  
    autoTable(doc, {
      head: [['ID', 'Utilisateur ID', 'Voyage ID', 'Note', 'Commentaire']],
      body: this.avisList.map(avis => [
        avis.id ?? '',
        avis.utilisateurId ?? '',
        avis.voyageId ?? '',
        avis.note ?? '',
        avis.commentaire ?? ''
      ]),
    });
  
    doc.save('avis_list.pdf');
  }

downloadAsExcel(): void {
  const worksheet = XLSX.utils.json_to_sheet(this.avisList.map(avis => ({
    'ID': avis.id,
    'Utilisateur ID': avis.utilisateurId,
    'Voyage ID': avis.voyageId,
    'Note': avis.note,
    'Commentaire': avis.commentaire
  })));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Avis');

  const excelBuffer: ArrayBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(data, 'avis_list.xlsx');
}

}
