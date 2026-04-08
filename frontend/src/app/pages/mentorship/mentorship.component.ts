import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import { MenteeViewComponent } from './mentee/mentee-view.component';
import { MentorViewComponent } from './mentor/mentor-view.component';

@Component({
  selector: 'app-mentorship',
  standalone: true,
  imports: [CommonModule, MenteeViewComponent, MentorViewComponent],
  template: `
    <app-mentor-view *ngIf="isMentor"></app-mentor-view>
    <app-mentee-view *ngIf="!isMentor"></app-mentee-view>
  `
})
export class MentorshipComponent {
  private authService = inject(AuthService);
  isMentor = this.authService.hasRole('ROLE_MENTOR');
}