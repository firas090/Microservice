import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agence } from 'src/app/models/agence';;
import { UserDTO } from 'src/app/models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {
  private apiUrl = 'http://localhost:7000/api/agences';

  constructor(private http: HttpClient) {}

  // Add a new agency
  addAgence(agence: Agence): Observable<Agence> {
    return this.http.post<Agence>(`${this.apiUrl}/add-agence`, agence);
  }

  // Get all agencies
  getAllAgences(): Observable<Agence[]> {
    return this.http.get<Agence[]>(`${this.apiUrl}/getAll`);
  }

  // Get agency by ID
  getAgenceById(id: string): Observable<Agence> {
    return this.http.get<Agence>(`${this.apiUrl}/getById/${id}`);
  }

  // Update agency
  updateAgence(id: string, agence: Agence): Observable<Agence> {
    return this.http.put<Agence>(`${this.apiUrl}/update/${id}`, agence);
  }

  // Delete agency
  deleteAgence(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Get agencies with responsables
  getAgencesWithResponsables(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Lister agences avec User responsable`);
  }

  // Get agencies by responsable ID
  getAgencesByResponsable(userId: number): Observable<Agence[]> {
    return this.http.get<Agence[]>(`${this.apiUrl}/Trouver agences par user/${userId}`);
  }

  // Toggle agency status
  toggleActiveStatus(id: string, active: boolean): Observable<Agence> {
    return this.http.put<Agence>(`${this.apiUrl}/${id}/active_desactiver?active=${active}`, {});
  }

  // Get number of agencies by role
  getNombreAgencesParRole(role: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/stats/Nombre d’agences par rôle`, {
      params: { role }
    });
  }

  // Search agencies
  searchAgences(nom?: string, adresse?: string, active?: boolean): Observable<Agence[]> {
    let params = new HttpParams();
    if (nom) params = params.set('nom', nom);
    if (adresse) params = params.set('adresse', adresse);
    if (active !== undefined) params = params.set('active', active.toString());
    return this.http.get<Agence[]>(`${this.apiUrl}/search_par_nom_adresse_status`, { params });
  }

  // Get top responsables
  getTopResponsables(limit: number = 3): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/top-N-responsables`, {
      params: { limit: limit.toString() }
    });
  }

  // Export agencies as CSV
  exportCSV(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export_agence_with_responsable/csv`, {
      responseType: 'blob'
    });
  }

  // Get statistics by city and status
  getStatsParVille(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats/actives_vs_inactives_par_ville`);
  }

  // Get availability rate by city
  getTauxParVille(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats/disponibilite-par-ville`);
  }

  // Compare responsables
  comparerResponsables(user1: number, user2: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/compare`, {
      params: { user1: user1.toString(), user2: user2.toString() }
    });
  }

  // Export active agencies as PDF
  exportActivesAsPdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/pdf/actives`, {
      responseType: 'blob'
    });
  }

  // Send agencies by email
  sendAgencesByEmail(to: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/mail/send`, null, {
      params: { to }
    });
  }
  downloadFile(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}