import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    MentorRequest,
    MentorSession,
    CreateMentorRequestDTO,
    CreateMentorSessionDTO
} from '../models/models';

@Injectable({ providedIn: 'root' })
export class MentorshipApiService {
    private http = inject(HttpClient);
    private api = environment.mentorshipApiUrl;

    getMentors(): Observable<any> {
        // This returns a paginated response from user-service
        return this.http.get<any>(`${environment.apiUrl}/api/users/by-role?role=MENTOR`);
    }

    sendRequest(dto: CreateMentorRequestDTO): Observable<MentorRequest> {
        return this.http.post<MentorRequest>(`${this.api}/api/mentor-requests`, dto);
    }

    getRequestsByMentee(menteeKeycloakId: string): Observable<MentorRequest[]> {
        return this.http.get<MentorRequest[]>(`${this.api}/api/mentor-requests/mentee/${menteeKeycloakId}`);
    }

    getRequestsByMentor(mentorKeycloakId: string): Observable<MentorRequest[]> {
        return this.http.get<MentorRequest[]>(`${this.api}/api/mentor-requests/mentor/${mentorKeycloakId}`);
    }

    acceptRequest(requestId: string): Observable<MentorRequest> {
        return this.http.put<MentorRequest>(`${this.api}/api/mentor-requests/${requestId}/accept`, {});
    }

    declineRequest(requestId: string): Observable<MentorRequest> {
        return this.http.put<MentorRequest>(`${this.api}/api/mentor-requests/${requestId}/decline`, {});
    }

    deleteRequest(requestId: string): Observable<void> {
        return this.http.delete<void>(`${this.api}/api/mentor-requests/${requestId}`);
    }

    createSession(dto: CreateMentorSessionDTO): Observable<MentorSession> {
        return this.http.post<MentorSession>(`${this.api}/api/mentor-sessions`, dto);
    }

    getSessionsByRequest(requestId: string): Observable<MentorSession[]> {
        return this.http.get<MentorSession[]>(`${this.api}/api/mentor-sessions/request/${requestId}`);
    }

    completeSession(sessionId: string): Observable<MentorSession> {
        return this.http.put<MentorSession>(`${this.api}/api/mentor-sessions/${sessionId}/complete`, {});
    }

    cancelSession(sessionId: string): Observable<MentorSession> {
        return this.http.put<MentorSession>(`${this.api}/api/mentor-sessions/${sessionId}/cancel`, {});
    }
}