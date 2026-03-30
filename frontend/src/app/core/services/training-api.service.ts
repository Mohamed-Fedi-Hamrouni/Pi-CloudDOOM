import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import {
    CreateDailyActivityRequest,
    CreateTrainingPathRequest,
    DailyActivityResponse,
    TrainingModuleResponse,
    TrainingPathResponse,
    UpdateModuleProgressRequest,
    UserXPTrackerResponse,
} from "../models/training.models";

@Injectable({ providedIn: "root" })
export class TrainingApiService {
    private http = inject(HttpClient);
    private baseUrl = environment.trainingApiUrl;

    getPathByUserId(userId: string): Observable<TrainingPathResponse> {
        return this.http.get<TrainingPathResponse>(
            `${this.baseUrl}/api/v1/training/paths/user/${userId}`,
        );
    }

    createPath(request: CreateTrainingPathRequest): Observable<TrainingPathResponse> {
        return this.http.post<TrainingPathResponse>(
            `${this.baseUrl}/api/v1/training/paths`,
            request,
        );
    }

    getOrCreatePath(userId: string): Observable<TrainingPathResponse> {
        return this.getPathByUserId(userId).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 404) {
                    return this.createPath({
                        userId,
                        status: "ACTIVE",
                        xpThreshold: 200,
                    });
                }
                return throwError(() => error);
            }),
        );
    }

    updateModuleProgress(
        pathId: number,
        moduleId: number,
        userId: string,
        request: UpdateModuleProgressRequest,
    ): Observable<TrainingModuleResponse> {
        return this.http.put<TrainingModuleResponse>(
            `${this.baseUrl}/api/v1/training/paths/${pathId}/modules/${moduleId}?userId=${encodeURIComponent(userId)}`,
            request,
        );
    }

    recordDailyActivity(
        request: CreateDailyActivityRequest,
    ): Observable<UserXPTrackerResponse> {
        return this.http.post<UserXPTrackerResponse>(
            `${this.baseUrl}/api/v1/training/activities`,
            request,
        );
    }

    getTodayActivity(userId: string): Observable<DailyActivityResponse> {
        return this.http.get<DailyActivityResponse>(
            `${this.baseUrl}/api/v1/training/activities/user/${encodeURIComponent(userId)}/today`,
        );
    }

    getLeaderboard(topN = 10): Observable<UserXPTrackerResponse[]> {
        return this.http.get<UserXPTrackerResponse[]>(
            `${this.baseUrl}/api/v1/training/leaderboard?topN=${topN}`,
        );
    }
}
