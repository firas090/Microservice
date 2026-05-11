import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransportService } from '../../services/transport-service/transport-service.service';
import { WeatherResponse } from 'src/app/models/WeatherResponse';  // Assurez-vous d'importer le modèle

@Component({
  selector: 'app-apiweather',
  templateUrl: './apiweather.component.html',
  styleUrls: ['./apiweather.component.css']
})
export class ApiweatherComponent implements OnInit {
  weather: WeatherResponse | undefined;  // Stocke la réponse de l'API météo
  weatherLoading: boolean = true;  // Indicateur de chargement pour la météo
  transportId: string = '';  // ID du transport, passé par le routeur
  errorMessage: string = '';  // Message d'erreur en cas de problème

  constructor(
    private transportService: TransportService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du transport depuis l'URL
    this.transportId = this.route.snapshot.paramMap.get('id')!;
    
    // Récupérer les données météo pour ce transport
    this.getWeather(this.transportId);
  }

  // Méthode pour récupérer les données météo
  getWeather(id: string): void {
    this.transportService.getWeatherForTransport(id).subscribe(
      (data) => {
        this.weather = data;
        this.weatherLoading = false;  // Terminer le chargement de la météo
      },
      (error) => {
        console.error('Erreur lors de la récupération des données météo', error);
        this.errorMessage = 'Erreur lors de la récupération des données météo.';
        this.weatherLoading = false;
      }
    );
  }
}
