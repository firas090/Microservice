import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Destination } from '../models/destination.model';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private apiUrl = '/api/destinations';  
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getAllDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.apiUrl}`)
      .pipe(catchError(this.handleError));
  }

  getDestinationById(id: number): Observable<Destination> {
    return this.http.get<Destination>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createDestination(destination: Destination): Observable<Destination> {
    return this.http.post<Destination>(`${this.apiUrl}`, destination)
      .pipe(catchError(this.handleError));
  }

  updateDestination(id: number, destination: Destination): Observable<Destination> {
    return this.http.put<Destination>(`${this.apiUrl}/${id}`, destination)
      .pipe(catchError(this.handleError));
  }

  deleteDestination(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  searchDestinationsByName(name: string): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.apiUrl}/search?name=${encodeURIComponent(name)}`)
      .pipe(catchError(this.handleError));
  }

  getDestinationsByCountry(country: string): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.apiUrl}/country/${encodeURIComponent(country)}`)
      .pipe(catchError(this.handleError));
  }

  getPopularDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.apiUrl}/popular`)
      .pipe(catchError(this.handleError));
  }

  recommendByPriceRange(minPrice: number, maxPrice: number): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.apiUrl}/recommend/price`, {
      params: { minPrice: minPrice.toString(), maxPrice: maxPrice.toString() }
    }).pipe(catchError(this.handleError));
  }

  recommendByCategory(category: string): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.apiUrl}/recommend/category/${encodeURIComponent(category)}`)
      .pipe(catchError(this.handleError));
  }

  recommendByClimate(climate: string): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.apiUrl}/recommend/climate/${encodeURIComponent(climate)}`)
      .pipe(catchError(this.handleError));
  }
}
