import { Component } from '@angular/core';
import { AgenceService } from 'src/app/services/agence-service/agence.service';

@Component({
  selector: 'app-agence-export',
  templateUrl: './agence-export.component.html',
  styleUrls: ['./agence-export.component.css']
})
export class AgenceExportComponent {
  constructor(private agenceService: AgenceService) {}

  exportCSV(): void {
    this.agenceService.exportCSV().subscribe(blob => {
      this.agenceService.downloadFile(blob, 'agences.csv');
    });
  }

  exportPDF(): void {
    this.agenceService.exportActivesAsPdf().subscribe(blob => {
      this.agenceService.downloadFile(blob, 'agences-actives.pdf');
    });
  }
}