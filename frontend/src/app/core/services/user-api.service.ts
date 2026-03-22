import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  plan: string;
  status: string;
  isVerified: boolean;
  karmaPoints: number;
  bio: string;
  avatarUrl: string;
  city: string;
  preferredIndustry: string;
  preferredLanguage: string;
  simulationsUsedThisMonth: number;
  simulationsLimit: number;
  subscriptionActive: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class UserApiService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getCurrentUser(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/api/users/me`);
  }

  updateCurrentUser(data: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/api/users/me`, data);
  }

  getUserById(id: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/api/users/${id}`);
  }
}
