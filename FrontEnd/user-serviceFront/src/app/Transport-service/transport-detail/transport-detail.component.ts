import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransportService } from '../../services/transport-service/transport-service.service';
import { TransportWithUserDTO } from 'src/app/models/TransportWithUserDTO';
import { WeatherResponse } from 'src/app/models/WeatherResponse';  // Importer le modèle pour la météo

@Component({
  selector: 'app-transport-detail',
  templateUrl: './transport-detail.component.html',
  styleUrls: ['./transport-detail.component.css']
})
export class TransportDetailComponent implements OnInit {
  transport: TransportWithUserDTO | undefined;
  weather: WeatherResponse | undefined;  // Stocke les données météo
  loading: boolean = true;
  weatherLoading: boolean = false;  // Indicateur pour afficher le chargement de la météo
  errorMessage: string = '';  // Message d'erreur pour la météo

  constructor(
    private transportService: TransportService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.getTransportWithUser(id);  // Charger les détails du transport
    this.getWeather(id);  // Charger la météo pour la ville de départ
  }

  getTransportWithUser(id: string): void {
    this.transportService.getTransportWithUser(id).subscribe(
      (data) => {
        this.transport = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du transport', error);
        this.loading = false;
      }
    );
  }

  // Fonction pour récupérer les données météo
  getWeather(id: string): void {
    this.weatherLoading = true;  // Afficher le loader de météo
    this.transportService.getWeatherForTransport(id).subscribe(
      (data) => {
        this.weather = data;
        this.weatherLoading = false;  // Masquer le loader
      },
      (error) => {
        console.error('Erreur lors de la récupération des données météo', error);
        this.errorMessage = 'Erreur lors de la récupération des données météo.';
        this.weatherLoading = false;
      }
    );
  }
}
