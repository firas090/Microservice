import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:7000/api/reservations';

  constructor(private http: HttpClient) {}

  // 🔄 Obtenir toutes les réservations
  getAllReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ➕ Ajouter une réservation
  addReservation(reservation: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(this.apiUrl, reservation, { headers });
  }

  // ❌ Supprimer une réservation par ID
  deleteReservation(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  // 🔍 Obtenir une réservation spécifique (pour l’édition)
  getReservationById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // ✏️ Modifier une réservation
  updateReservation(id: number, reservation: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/${id}`, reservation, { headers });
  }

  getStatistics(): Observable<any> {
    return this.http.get('http://localhost:7000/api/reservations/statistics');
  }

  getRecommendations(userId: number): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:7000/api/reservations/recommendations/${userId}`);
  }
  downloadTicket(resId: number): Observable<Blob> {
    return this.http.get(`http://localhost:7000/api/reservations/${resId}/ticket`, {
      responseType: 'blob'
    });
  }

  // Obtenir les options disponibles
// Ajouter des options à une réservation
addOptions(reservationId: number, selectedOptions: string[]): Observable<any> {
  return this.http.post(`http://localhost:7000/api/reservations/${reservationId}/options`, selectedOptions);
}

// ✅ Récupérer les options sélectionnées (déjà cochées)
getAvailableOptions(reservationId: number): Observable<string[]> {
  return this.http.get<string[]>(`${this.apiUrl}/${reservationId}/options`);
}

// ✅ Obtenir les options sélectionnées
getSelectedOptions(reservationId: number): Observable<string[]> {
  return this.http.get<string[]>(`${this.apiUrl}/${reservationId}/options`);
}

}
