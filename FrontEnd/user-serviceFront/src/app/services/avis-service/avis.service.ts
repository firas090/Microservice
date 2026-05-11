import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Avis } from 'src/app/models/Avis';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  private apiUrl = 'http://localhost:7000/api/avis'; // adapte au port de ton microservice

  constructor(private http: HttpClient,private authService: AuthService ) {}

 
  createAvis(avis: Avis): Observable<Avis> {
    const userId = this.authService.getCurrentUserId(); // ou depuis le token/localStorage
    const headers = new HttpHeaders({
      'X-User-Id': userId.toString()
    });
    return this.http.post<Avis>(`${this.apiUrl}/addAvis`, avis, { headers });
  }
  

  getAllAvis(): Observable<Avis[]> {
    return this.http.get<Avis[]>(`${this.apiUrl}`);
  }

  getAvisByUserId(userId: number): Observable<Avis[]> {
    return this.http.get<Avis[]>(`${this.apiUrl}/utilisateur/${userId}`);
  }
 
  getAvisById(id: number): Observable<Avis> {
    return this.http.get<Avis>(`${this.apiUrl}/getavis/${id}`); // Appel à l'API pour récupérer un seul avis
  }
  
  updateAvis(id: number, avis: Avis): Observable<Avis> {
    const userId = this.authService.getCurrentUserId();
    const headers = new HttpHeaders({
      'X-User-Id': userId.toString()
    });
    return this.http.put<Avis>(`${this.apiUrl}/${id}`, avis, { headers });
  }
  deleteAvis(id: number): Observable<void> {
    const userId = this.authService.getCurrentUserId();
    const headers = new HttpHeaders({
      'X-User-Id': userId.toString()
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
    
  getAvisBySearch(keyword: string, voyageId: number | null, approuve: boolean | null): Observable<Avis[]> {
    let params = new HttpParams();
    if (keyword) params = params.set('keyword', keyword);
    if (voyageId) params = params.set('voyageId', voyageId.toString());
    if (approuve !== null) params = params.set('approuve', approuve.toString());
  
    return this.http.get<Avis[]>(`${this.apiUrl}/recherche`, { params });
  }  

  ajouterReaction(avisId: number, userId: number, liked: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/${avisId}/user/${userId}`, null, { params: { liked: liked.toString() } });
  }

}
