import { Injectable } from '@angular/core';
import { TransportWithUserDTO } from 'src/app/models/TransportWithUserDTO';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transport } from 'src/app/models/transport'; // Assure-toi de créer ce modèle
import { WeatherResponse } from 'src/app/models/WeatherResponse';
@Injectable({
  providedIn: 'root'
})
export class TransportService {

  private apiUrl = 'http://localhost:7000/api/transports'; // L'URL de ton backend

  constructor(private http: HttpClient) {}

  // Récupérer tous les transports
  getAllTransports(): Observable<Transport[]> {
    return this.http.get<Transport[]>(this.apiUrl);
  }
  // Récupérer un transport par ID
  getTransportById(id: string): Observable<Transport> {
    return this.http.get<Transport>(`${this.apiUrl}/${id}`);
  }
 // Récupérer un transport avec les détails de l'utilisateur
 getTransportWithUser(id: string): Observable<TransportWithUserDTO> {
  return this.http.get<TransportWithUserDTO>(`${this.apiUrl}/${id}/with-user`);
}
 
  addTransport(transport: Transport): Observable<Transport> {
    return this.http.post<Transport>(this.apiUrl, transport);
  }
  // Récupérer les informations météo pour la ville de départ d'un transport
  getWeatherForTransport(id: string): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(`${this.apiUrl}/${id}/weather`);
  }

  updateTransport(id: string, transport: Transport): Observable<Transport> {
    return this.http.put<Transport>(`${this.apiUrl}/${id}`, transport);
  }

  // Supprimer un transport
  deleteTransport(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer les transports d'un utilisateur
  getTransportsByUserId(userId: number): Observable<Transport[]> {
    return this.http.get<Transport[]>(`${this.apiUrl}/user/${userId}`);
  }
}
