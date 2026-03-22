import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, CommonModule],
  template: `
    <div class="shell" [class.sidebar-collapsed]="sidebarCollapsed()">
      <app-sidebar
        [collapsed]="sidebarCollapsed()"
        (toggleSidebar)="toggleSidebar()"
      ></app-sidebar>

      <div class="shell-content">
        <app-topbar
          [sidebarCollapsed]="sidebarCollapsed()"
          (toggleSidebar)="toggleSidebar()"
        ></app-topbar>

        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </div>

      <!-- Mobile overlay -->
      <div
        class="mobile-overlay"
        *ngIf="!sidebarCollapsed()"
        (click)="toggleSidebar()"
      ></div>
    </div>
  `,
  styles: [`
    .shell {
      display: flex;
      min-height: 100vh;
      background: var(--color-bg);
    }

    .shell-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      margin-left: var(--sidebar-width);
      transition: margin-left var(--transition-base);
    }

    .shell.sidebar-collapsed .shell-content {
      margin-left: 72px;
    }

    .main-content {
      flex: 1;
      padding: var(--space-8) var(--page-padding);
      overflow-y: auto;
      overflow-x: hidden;
    }

    .mobile-overlay {
      display: none;
    }

    @media (max-width: 768px) {
      .shell-content {
        margin-left: 0 !important;
      }

      .mobile-overlay {
        display: block;
        position: fixed;
        inset: 0;
        background: rgba(15,23,42,0.4);
        z-index: 40;
        backdrop-filter: blur(2px);
      }

      .main-content {
        padding: var(--space-4) var(--space-4);
      }
    }
  `]
})
export class ShellComponent {
  sidebarCollapsed = signal(false);

  toggleSidebar() {
    this.sidebarCollapsed.update(v => !v);
  }
}
