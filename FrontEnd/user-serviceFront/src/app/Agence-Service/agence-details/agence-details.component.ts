import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgenceService } from 'src/app/services/agence-service/agence.service';
import { Agence } from '../../models/agence';

@Component({
  selector: 'app-agence-details',
  templateUrl: './agence-details.component.html',
  styleUrls: ['./agence-details.component.css']
})
export class AgenceDetailsComponent implements OnInit {
  agence: Agence | undefined;

  constructor(private agenceService: AgenceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.agenceService.getAgenceById(id).subscribe(data => {
        this.agence = data;
      });
    }
  }
}