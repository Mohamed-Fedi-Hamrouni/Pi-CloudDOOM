import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { BadgeCardComponent } from '../../shared/components/badge-card/badge-card.component';
import { ActivityItemComponent } from '../../shared/components/activity-item/activity-item.component';
import { ChartPlaceholderComponent } from '../../shared/components/chart-placeholder/chart-placeholder.component';
import { MOCK_USER, MOCK_DASHBOARD, MOCK_BADGES } from '../../core/data/mock-data';
import { AuthService } from '../../core/auth/auth.service';
import { AdminDashboardComponent } from '../admin/admin-dashboard.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
  user = MOCK_USER;
  dashboard = MOCK_DASHBOARD;
  earnedBadges = MOCK_BADGES.filter((b) => b.earned);
  authService = inject(AuthService);
  private http = inject(HttpClient);
  isAdmin = this.authService.hasRole('ROLE_ADMIN');
  activeTab = 'overview';
  circumference = 2 * Math.PI * 48;
  currentUser: any = null;

  get readinessDash() {
    return (this.user.readinessScore / 100) * this.circumference;
  }

  get welcomeName(): string {
    return this.currentUser?.firstName || this.authService.getFirstName() || 'there';
  }

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/api/users/me`).subscribe({
      next: (user) => { this.currentUser = user; },
      error: () => {}
    });
  }

  recommendations = [
    { icon: '<i class="bi bi-star-fill"></i>', title: 'STAR Method Advanced Practice', progress: 75, xp: 250 },
    { icon: '<i class="bi bi-laptop"></i>', title: 'Technical Communication Skills', progress: 40, xp: 200 },
    { icon: '<i class="bi bi-mic-fill"></i>', title: 'Confidence & Delivery Mastery', progress: 60, xp: 150 },
  ];

  savedResources = [
    { icon: '<i class="bi bi-file-text-fill"></i>', title: 'The Ultimate STAR Method Guide', duration: '8 min', category: 'Behavioral' },
    { icon: '<i class="bi bi-clipboard-fill"></i>', title: 'CV Template — Tech Roles 2025', duration: 'Download', category: 'Job Search' },
    { icon: '<i class="bi bi-play-circle-fill"></i>', title: 'Negotiation & Offer Letters', duration: '28 min', category: 'Career' },
  ];
}
