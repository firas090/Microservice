import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8082/api/users';
  private currentUserSubject = new BehaviorSubject<User | null>(this.loadUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  private loadUserFromStorage(): User | null {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }

  // ✅ Sign In
  signIn(user: User): Observable<{ token: string; message: string; user: User }> {
    return this.http.post<{ token: string; message: string; user: User }>(
      `${this.baseUrl}/signin`,
      user
    );
  }

  // ✅ Sign Up
  signUp(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  // ✅ Login => Sauvegarder token + user
  login(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // ✅ Est connecté ?
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // ✅ Récupérer l'utilisateur actuel
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // ✅ Récupérer son ID
  getCurrentUserId(): number {
    const user = this.getCurrentUser();
    return user && user.id !== undefined ? user.id : 0;
  }

  // ✅ Déconnexion
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  // ✅ Envoi mail mot de passe oublié
  sendResetPasswordEmail(email: string): Observable<any> {
    return this.http.post('/api/auth/forgot-password', { email });
  }
  refreshUser(): void {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.currentUserSubject.next(JSON.parse(stored));
    }
  }
  
}
