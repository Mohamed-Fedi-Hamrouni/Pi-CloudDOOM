import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { BadgeCardComponent } from '../../shared/components/badge-card/badge-card.component';
import { ActivityItemComponent } from '../../shared/components/activity-item/activity-item.component';
import { ChartPlaceholderComponent } from '../../shared/components/chart-placeholder/chart-placeholder.component';
import { MOCK_DASHBOARD, MOCK_BADGES } from '../../core/data/mock-data';
import { AuthService } from '../../core/auth/auth.service';
import { AdminDashboardComponent } from '../admin/admin-dashboard.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResourceApiService, BookmarkApiResponse, ResourceStatsResponse } from '../../core/services/resource-api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterLink, StatCardComponent, SectionHeaderComponent,
    BadgeCardComponent, ActivityItemComponent, ChartPlaceholderComponent,
    AdminDashboardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboard = MOCK_DASHBOARD;
  earnedBadges = MOCK_BADGES.filter((b) => b.earned);
  authService = inject(AuthService);
  private http = inject(HttpClient);
  private resourceApi = inject(ResourceApiService);
  isAdmin = this.authService.hasRole('ROLE_ADMIN');
  activeTab = 'overview';
  circumference = 2 * Math.PI * 48;

  currentUser: any = null;
  bookmarks: BookmarkApiResponse[] = [];
  resourceStats: ResourceStatsResponse | null = null;
  isLoadingUser = true;
  isLoadingBookmarks = true;

  get readinessScore(): number {
    if (!this.currentUser) return 0;
    const karma = this.currentUser.karmaPoints ?? 0;
    const sessions = this.currentUser.simulationsUsedThisMonth ?? 0;
    const karmaScore = Math.min(40, Math.round(karma / 5));
    const sessionScore = Math.min(30, sessions * 6);
    const profileScore = Math.round(this.profileCompletion * 0.3);
    return Math.min(100, karmaScore + sessionScore + profileScore);
  }

  get readinessDash(): number {
    return (this.readinessScore / 100) * this.circumference;
  }

  get profileCompletion(): number {
    if (!this.currentUser) return 0;
    const checks = [
      !!(this.currentUser.firstName && this.currentUser.lastName),
      (this.currentUser.simulationsUsedThisMonth ?? 0) > 0,
      true,
      !!this.currentUser.bio,
      !!this.currentUser.city,
      !!this.currentUser.isVerified,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/api/users/me`).subscribe({
      next: (user) => {
        this.currentUser = user;
        this.isLoadingUser = false;
      },
      error: () => { this.isLoadingUser = false; }
    });

    this.resourceApi.getBookmarks().subscribe({
      next: (bms) => {
        this.bookmarks = bms;
        this.isLoadingBookmarks = false;
      },
      error: () => { this.isLoadingBookmarks = false; }
    });

    this.resourceApi.getStats().subscribe({
      next: (stats) => { this.resourceStats = stats; },
      error: () => {}
    });
  }

  getResourceTypeIcon(type: string): string {
    const icons: Record<string, string> = {
      VIDEO: '🎬', ARTICLE: '📄', PODCAST: '🎙️', BOOK: '📚',
      QUIZ: '📝', EXERCISE: '💪', TEMPLATE: '📋'
    };
    return icons[type?.toUpperCase()] ?? '📄';
  }

  recommendations = [
    { icon: '⭐', title: 'STAR Method Advanced Practice', progress: 75, xp: 250 },
    { icon: '💻', title: 'Technical Communication Skills', progress: 40, xp: 200 },
    { icon: '🎤', title: 'Confidence & Delivery Mastery', progress: 60, xp: 150 },
  ];
}
