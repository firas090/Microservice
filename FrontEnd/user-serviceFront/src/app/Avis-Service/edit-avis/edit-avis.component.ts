import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvisService } from 'src/app/services/avis-service/avis.service';
import { Avis } from 'src/app/models/Avis';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Ajoute ces imports

@Component({
  selector: 'app-edit-avis',
  templateUrl: './edit-avis.component.html',
  styleUrls: ['./edit-avis.component.css']
})
export class EditAvisComponent implements OnInit {
  avisId: number = 0;
  avis: Avis = {
    id: 0,
    utilisateurId: 0,
    voyageId: 0,
    note: 0,
    commentaire: ''
  };
  avisForm: FormGroup; // Ajoute un FormGroup
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(
    private avisService: AvisService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder // Injecte FormBuilder
  ) {
    // Initialise le formulaire
    this.avisForm = this.fb.group({
      voyageId: [0, Validators.required],
      note: [0, Validators.required],
      commentaire: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.avisId = +idParam;
      this.getAvis();
    } else {
      console.error("L'ID de l'avis est manquant dans l'URL.");
      this.router.navigate(['/list-all-avis']);
    }
  }

  getAvis(): void {
    this.avisService.getAvisById(this.avisId).subscribe({
      next: (data) => {
        if (data) {
          this.avis = data;
          console.log('Avis récupéré : ', this.avis);
          // Met à jour le formulaire avec les données récupérées
          this.avisForm.patchValue({
            voyageId: this.avis.voyageId,
            note: this.avis.note,
            commentaire: this.avis.commentaire
          });
        } else {
          console.error('Avis introuvable');
          this.router.navigate(['/list-all-avis']);
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'avis :', err);
      }
    });
  }

  setRating(value: number): void {
    this.avisForm.get('note')?.setValue(value); // Met à jour la note dans le formulaire
  }

  onSubmit(): void {
    if (this.avisForm.valid) {
      const updatedAvis: Avis = {
        ...this.avis,
        voyageId: this.avisForm.get('voyageId')?.value,
        note: this.avisForm.get('note')?.value,
        commentaire: this.avisForm.get('commentaire')?.value
      };
      this.avisService.updateAvis(this.avisId, updatedAvis).subscribe({
        next: () => {
          console.log('Avis modifié avec succès !');
          this.router.navigate(['/list-all-avis']);
        },
        error: (err) => {
          console.error('Erreur lors de la modification de l\'avis :', err);
        }
      });
    }
  }
}