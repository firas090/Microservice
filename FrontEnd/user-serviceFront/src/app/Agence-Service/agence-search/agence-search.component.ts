import { Component } from '@angular/core';
import { AgenceService } from 'src/app/services/agence-service/agence.service';
import { Agence } from '../../models/agence';

@Component({
  selector: 'app-agence-search',
  templateUrl: './agence-search.component.html',
  styleUrls: ['./agence-search.component.css']
})
export class AgenceSearchComponent {
  nom: string = '';
  adresse: string = '';
  active: boolean | undefined = undefined;
  agences: Agence[] = [];

  constructor(private agenceService: AgenceService) {}

  search(): void {
    this.agenceService.searchAgences(this.nom, this.adresse, this.active).subscribe(data => {
      this.agences = data;
    });
  }
}