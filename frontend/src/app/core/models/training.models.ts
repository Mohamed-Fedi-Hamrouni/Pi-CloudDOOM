export interface TrainingPathResponse {
    id: number;
    userId: string;
    status: "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";
    xpThreshold: number;
    createdAt: string;
    updatedAt: string;
    modules: TrainingModuleResponse[];
}

export interface TrainingModuleResponse {
    id: number;
    pathId: number;
    category:
        | "COMMUNICATION"
        | "STRESS_MANAGEMENT"
        | "CONTENT_PREP"
        | "BODY_LANGUAGE"
        | "INDUSTRY_SPECIFIC";
    title: string;
    lessons: number;
    completedLessons: number;
    progress: number;
    xpReward: number;
    status: "LOCKED" | "IN_PROGRESS" | "COMPLETED" | "SKIPPED";
    unlockedAt?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTrainingPathRequest {
    userId: string;
    status: "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";
    xpThreshold: number;
}

export interface UpdateModuleProgressRequest {
    completedLessons?: number;
    progress?: number;
}

export interface CreateDailyActivityRequest {
    userId: string;
    activityDate?: string;
    xpEarned?: number;
    sessionCompleted?: boolean;
    goalsCompleted?: number;
    behavioralCount?: number;
    libraryCount?: number;
    quizCount?: number;
}

export interface DailyActivityResponse {
    id?: number;
    userId: string;
    activityDate: string;
    xpEarned: number;
    sessionCompleted: boolean;
    goalsCompleted: number;
    behavioralCount: number;
    libraryCount: number;
    quizCount: number;
    createdAt?: string;
}

export interface UserXPTrackerResponse {
    id: number;
    userId: string;
    totalXp: number;
    currentLevel: number;
    xpToNextLevel: number;
    currentStreak: number;
    longestStreak: number;
    lastActivityDate?: string;
}
