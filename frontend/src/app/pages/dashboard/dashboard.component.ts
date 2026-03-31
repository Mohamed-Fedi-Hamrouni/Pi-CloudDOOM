import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

import { AuthService } from '../../core/auth/auth.service';
import { environment } from '../../../environments/environment';
import { MOCK_USER, MOCK_DASHBOARD, MOCK_BADGES } from '../../core/data/mock-data';

import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { BadgeCardComponent } from '../../shared/components/badge-card/badge-card.component';
import { ActivityItemComponent } from '../../shared/components/activity-item/activity-item.component';
import { ChartPlaceholderComponent } from '../../shared/components/chart-placeholder/chart-placeholder.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    StatCardComponent,
    SectionHeaderComponent,
    BadgeCardComponent,
    ActivityItemComponent,
    ChartPlaceholderComponent,
    AdminDashboardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  user = MOCK_USER;
  dashboard = MOCK_DASHBOARD;
  earnedBadges = MOCK_BADGES.filter(b => b.earned);
  currentUser: any = null;

  isAdmin = this.authService.hasRole('ROLE_ADMIN');
  activeTab: 'overview' | 'admin' = 'overview';
  circumference = 2 * Math.PI * 48;

  recommendations = [
    { icon: '⭐', title: 'STAR Method Advanced Practice', progress: 75, xp: 250 },
    { icon: '💻', title: 'Technical Communication Skills', progress: 40, xp: 200 },
    { icon: '🎤', title: 'Confidence & Delivery Mastery', progress: 60, xp: 150 }
  ];

  savedResources = [
    { icon: '📄', title: 'The Ultimate STAR Method Guide', duration: '8 min', category: 'Behavioral' },
    { icon: '📋', title: 'CV Template 2025', duration: 'Download', category: 'Job Search' }
  ];

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    this.http.get<any>(`${environment.apiUrl}/api/users/me`).pipe(
      catchError(() => {
        return of({
          firstName: this.authService.getFirstName() || 'User',
          lastName: this.authService.getLastName() || '',
          karmaPoints: 0,
          readinessScore: 65
        });
      })
    ).subscribe(data => this.currentUser = data);
  }

  get readinessDash(): number {
    const score = this.currentUser?.readinessScore || 0;
    return (score / 100) * this.circumference;
  }

  switchTab(tab: 'overview' | 'admin'): void {
    this.activeTab = tab;
  }
}