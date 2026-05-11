import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgenceService } from 'src/app/services/agence-service/agence.service';
import { Agence } from '../../models/agence';

@Component({
  selector: 'app-agence-form',
  templateUrl: './agence-form.component.html',
  styleUrls: ['./agence-form.component.css']
})
export class AgenceFormComponent implements OnInit {
  agence: Agence = {
    nomAg: '',
    adresse: '',
    email: '',
    telephone: '',
    siteWeb: '',
    description: '',
    active: true,
    responsableId: 0
  };
  isEditMode = false;

  constructor(
    private agenceService: AgenceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.agenceService.getAgenceById(id).subscribe(data => {
        this.agence = data;
      });
    }
  }

  saveAgence(): void {
    if (this.isEditMode) {
      this.agenceService.updateAgence(this.agence.idAgence!, this.agence).subscribe(() => {
        this.router.navigate(['/agences']);
      });
    } else {
      this.agenceService.addAgence(this.agence).subscribe(() => {
        this.router.navigate(['/agences']);
      });
    }
  }
}