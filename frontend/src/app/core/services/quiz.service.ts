/*import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private http = inject(HttpClient);
  private apiUrl = environment.quizApiUrl;

  // --- Gestion Admin ---
  getQuizzes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/quizzes`);
  }

  createQuiz(quiz: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/quizzes`, quiz);
  }

 // Supprimer un quiz (Endpoint: DELETE /api/quizzes/{id})
deleteQuiz(id: string) {
  return this.http.delete(`${this.apiUrl}/api/quizzes/${id}`);
}

// Pour la modification, on récupère d'abord les données
getQuizById(id: string) {
  return this.http.get(`${this.apiUrl}/api/quizzes/${id}`);
}

// DANS TON SERVICE
updateQuiz(id: string, data: any): Observable<any> {
  // 1. Vérifie que le port est 8081 (comme pour le reste)
  // 2. Vérifie que le chemin /api/quizzes/ est présent
  return this.http.put(`http://localhost:8081/api/quizzes/${id}`, data);
}

 // S'assurer que les URLs correspondent à ton AttemptController
startQuiz(quizId: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/quizzes/${quizId}/start`, {});
}

submitAttempt(attemptId: string, payload: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/attempts/${attemptId}/submit`, payload);
}

  getMyAttempts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/attempts/my`);
  }


  getAdminQuizzes() {
    // Appel vers la nouvelle route qui ne cache rien
    return this.http.get('http://localhost:8082/api/quizzes/admin/all');
  }
}*/
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private http = inject(HttpClient);
  
  // Utilise TOUJOURS le port 8082 pour le Quiz Service
  private apiUrl = 'http://localhost:8082/api'; 

  // --- Gestion des Quiz (QuizController) ---

  getQuizzes(): Observable<any> {
    // Java: @GetMapping("/api/quizzes")
    return this.http.get(`${this.apiUrl}/quizzes`);
  }

  getAdminQuizzes(): Observable<any> {
    // Java: @GetMapping("/api/quizzes/admin/all")
    return this.http.get(`${this.apiUrl}/quizzes/admin/all`);
  }

  getQuizById(id: string): Observable<any> {
    // Java: @GetMapping("/api/quizzes/{id}")
    return this.http.get(`${this.apiUrl}/quizzes/${id}`);
  }

  createQuiz(quiz: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/quizzes`, quiz);
  }

  updateQuiz(id: string, data: any): Observable<any> {
    // CORRECTION : On reste sur le port 8082 (le 8081 est pour le User Service !)
    return this.http.put(`${this.apiUrl}/quizzes/${id}`, data);
  }

  deleteQuiz(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/quizzes/${id}`);
  }

  // --- Gestion des Tentatives (AttemptController) ---

  startQuiz(quizId: string): Observable<any> {
    // Java: @PostMapping("/api/quizzes/{quizId}/start")
    // Note: Le chemin commence par /quizzes dans ton AttemptController
    return this.http.post<any>(`${this.apiUrl}/quizzes/${quizId}/start`, {});
  }

  submitAttempt(attemptId: string, payload: any): Observable<any> {
    // Java: @PostMapping("/api/attempts/{attemptId}/submit")
    return this.http.post<any>(`${this.apiUrl}/attempts/${attemptId}/submit`, payload);
  }

  getMyAttempts(): Observable<any> {
    // Java: @GetMapping("/api/attempts/my")
    return this.http.get(`${this.apiUrl}/attempts/my`);
  }

  // Dans quiz.service.ts
publishQuiz(id: string): Observable<void> {
  return this.http.patch<void>(`${this.apiUrl}/${id}/publish`, {});
}
}