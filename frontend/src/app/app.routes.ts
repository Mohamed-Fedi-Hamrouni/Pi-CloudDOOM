import { Routes } from "@angular/router";
import { authGuard } from "./core/auth/auth.guard";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadComponent: () =>
      import("./pages/landing/landing.component").then(
        (m) => m.LandingComponent,
      ),
  },
  {
  path: "quick-interview/:sessionId",
  loadComponent: () =>
    import("./pages/quick-interview/quick-interview.component").then(
      (m) => m.QuickInterviewComponent,
    ),
},
  {
    path: "",
    loadComponent: () =>
      import("./layout/shell/shell.component").then((m) => m.ShellComponent),
    canActivate: [authGuard],
    children: [
      {
        path: "dashboard",
        loadComponent: () =>
          import("./pages/dashboard/dashboard.component").then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: "profile",
        loadComponent: () =>
          import("./pages/profile/profile.component").then(
            (m) => m.ProfileComponent,
          ),
      },
      {
        path: "interviews",
        loadComponent: () =>
          import("./pages/interviews/interviews.component").then(
            (m) => m.InterviewsComponent,
          ),
      },
      {
        path: "reports",
        loadComponent: () =>
          import("./pages/reports/reports.component").then(
            (m) => m.ReportsComponent,
          ),
      },
      {
        path: "quiz-assessment",
        loadComponent: () =>
          import("./pages/quiz-assessment/quiz-assessment.component").then(
            (m) => m.QuizAssessmentComponent,
          ),
      },
      {
        path: "training-gamification",
        loadComponent: () =>
          import("./pages/training-gamification/training-gamification.component").then(
            (m) => m.TrainingGamificationComponent,
          ),
      },
      {
        path: "mentorship",
        loadComponent: () =>
          import("./pages/mentorship/mentorship.component").then(
            (m) => m.MentorshipComponent,
          ),
      },
      {
        path: "community",
        loadComponent: () =>
          import("./pages/community/community.component").then(
            (m) => m.CommunityComponent,
          ),
      },
      {
        path: "library",
        loadComponent: () =>
          import("./pages/library/library.component").then(
            (m) => m.LibraryComponent,
          ),
      },
      {
        path: "pricing",
        loadComponent: () =>
          import("./pages/pricing/pricing.component").then(
            (m) => m.PricingComponent,
          ),
      },
      {
        path: "settings",
        loadComponent: () =>
          import("./pages/settings/settings.component").then(
            (m) => m.SettingsComponent,
          ),
      },
      {
        path: "live-interview/:sessionId",
        loadComponent: () =>
          import("./pages/live-interview/live-interview.component").then(
            (m) => m.LiveInterviewComponent,
          ),
      },

      {
        path: "complete-profile",
        loadComponent: () =>
          import("./pages/complete-profile/complete-profile.component").then(
            (m) => m.CompleteProfileComponent,
          ),
      },
      { path: "**", redirectTo: "" },
    ],
  },
];
