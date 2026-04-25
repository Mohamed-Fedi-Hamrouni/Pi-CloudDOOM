import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-page animate-fade">
      <div class="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your account, notifications, and preferences.</p>
        </div>
        <button class="btn btn-primary" (click)="saveCurrentTab()" [disabled]="saving">
          {{ saving ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>

      <div class="saved-toast" *ngIf="saved">✓ Changes saved successfully!</div>
      <div class="error-toast" *ngIf="saveError">{{ saveError }}</div>

      <div class="settings-layout">

        <!-- Nav sidebar -->
        <div class="settings-nav">
          <button
            class="sn-item"
            *ngFor="let tab of tabs"
            [class.active]="activeTab() === tab.key"
            (click)="setTab(tab.key)"
          >
            <span>{{ tab.icon }}</span>
            <span>{{ tab.label }}</span>
          </button>
        </div>

        <!-- Content panels -->
        <div class="settings-content">

          <!-- Account -->
          <div *ngIf="activeTab() === 'account'" class="settings-panel">
            <div class="sp-title">Account Information</div>
            <div class="sp-desc">Update your personal details and preferences.</div>

            <div *ngIf="isLoadingUser" class="account-skeleton">
              <div class="sk-line" style="width:60%;height:36px"></div>
              <div class="sk-line" style="width:60%;height:36px"></div>
              <div class="sk-line" style="width:100%;height:80px"></div>
            </div>

            <div class="form-grid" *ngIf="!isLoadingUser">
              <div class="form-group">
                <label>First Name</label>
                <input class="input" [(ngModel)]="editForm.firstName" placeholder="Your first name">
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input class="input" [(ngModel)]="editForm.lastName" placeholder="Your last name">
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input class="input" [value]="currentUser?.email || ''" readonly style="opacity:.7;cursor:not-allowed" type="email">
                <span class="field-hint">Email is managed by your identity provider.</span>
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input class="input" [(ngModel)]="editForm.phoneNumber" type="tel" placeholder="+216...">
              </div>
              <div class="form-group">
                <label>City</label>
                <input class="input" [(ngModel)]="editForm.city" placeholder="e.g. Tunis">
              </div>
              <div class="form-group">
                <label>Preferred Industry</label>
                <select class="input" [(ngModel)]="editForm.preferredIndustry">
                  <option value="">Select industry</option>
                  <option value="TECHNOLOGY">Technology</option>
                  <option value="FINANCE">Finance</option>
                  <option value="HEALTHCARE">Healthcare</option>
                  <option value="EDUCATION">Education</option>
                  <option value="MARKETING">Marketing</option>
                  <option value="ENGINEERING">Engineering</option>
                  <option value="CONSULTING">Consulting</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label>Preferred Language</label>
                <select class="input" [(ngModel)]="editForm.preferredLanguage">
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>
              <div class="form-group full-width">
                <label>Bio</label>
                <textarea class="input" rows="3" [(ngModel)]="editForm.bio" placeholder="Tell us about yourself, your goals and what you're looking for..."></textarea>
              </div>
            </div>

            <div class="sp-divider"></div>
            <div class="sp-title">Privacy</div>
            <div class="notif-group" *ngIf="!isLoadingUser">
              <div class="notif-item">
                <div class="ni-label">
                  <div class="ni-name">Public Profile</div>
                  <div class="ni-desc">Allow other community members to view your profile.</div>
                </div>
                <div class="toggle-switch" [class.on]="editForm.profileVisible" (click)="editForm.profileVisible = !editForm.profileVisible">
                  <div class="toggle-knob"></div>
                </div>
              </div>
            </div>

            <div class="sp-divider"></div>
            <div class="sp-title">Change Password</div>
            <div class="form-grid">
              <div class="form-group">
                <label>Current Password</label>
                <input class="input" type="password" placeholder="••••••••">
              </div>
              <div class="form-group">
                <label>New Password</label>
                <input class="input" type="password" placeholder="••••••••">
              </div>
              <div class="form-group">
                <label>Confirm New Password</label>
                <input class="input" type="password" placeholder="••••••••">
              </div>
            </div>

            <div class="sp-divider"></div>
            <div class="sp-title" style="color:var(--error-600);">Danger Zone</div>
            <p class="sp-desc">Once you delete your account, all of your data will be permanently removed.</p>
            <button class="btn btn-sm" style="background:var(--error-50);color:var(--error-600);border:1px solid var(--error-200);">Delete Account</button>
          </div>

          <!-- Notifications -->
          <div *ngIf="activeTab() === 'notifications'" class="settings-panel">
            <div class="sp-title">Notification Preferences</div>
            <div class="sp-desc">Control how and when you hear from us.</div>

            <div *ngIf="!isLoadingUser" class="notif-group" style="margin-bottom:var(--space-4)">
              <div class="ng-title">Quick Settings (saved to your profile)</div>
              <div class="notif-item">
                <div class="ni-label">
                  <div class="ni-name">Email Notifications</div>
                  <div class="ni-desc">Receive session reports, reminders, and updates by email.</div>
                </div>
                <div class="toggle-switch" [class.on]="editForm.emailNotificationsEnabled" (click)="editForm.emailNotificationsEnabled = !editForm.emailNotificationsEnabled">
                  <div class="toggle-knob"></div>
                </div>
              </div>
              <div class="notif-item">
                <div class="ni-label">
                  <div class="ni-name">Push Notifications</div>
                  <div class="ni-desc">Receive in-app notifications for activity updates.</div>
                </div>
                <div class="toggle-switch" [class.on]="editForm.pushNotificationsEnabled" (click)="editForm.pushNotificationsEnabled = !editForm.pushNotificationsEnabled">
                  <div class="toggle-knob"></div>
                </div>
              </div>
            </div>

            <div class="notif-group" *ngFor="let group of notificationGroups">
              <div class="ng-title">{{ group.title }}</div>
              <div class="notif-item" *ngFor="let item of group.items">
                <div class="ni-label">
                  <div class="ni-name">{{ item.name }}</div>
                  <div class="ni-desc">{{ item.desc }}</div>
                </div>
                <div class="ni-toggles">
                  <div class="ni-toggle-item" *ngFor="let channel of channels">
                    <span class="ni-channel-label">{{ channel }}</span>
                    <div class="toggle-switch" [class.on]="item.enabled" (click)="item.enabled = !item.enabled">
                      <div class="toggle-knob"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Appearance -->
          <div *ngIf="activeTab() === 'appearance'" class="settings-panel">
            <div class="sp-title">Appearance</div>
            <div class="sp-desc">Customize how interV looks and feels.</div>

            <div class="setting-row">
              <div class="sr-info">
                <div class="sr-label">Theme</div>
                <div class="sr-desc">Choose between light and dark mode.</div>
              </div>
              <div class="theme-options">
                <button class="theme-btn" [class.active]="theme === 'light'" (click)="theme = 'light'">☀️ Light</button>
                <button class="theme-btn" [class.active]="theme === 'dark'" (click)="theme = 'dark'">🌙 Dark</button>
                <button class="theme-btn" [class.active]="theme === 'system'" (click)="theme = 'system'">💻 System</button>
              </div>
            </div>

            <div class="sp-divider"></div>

            <div class="setting-row" *ngFor="let setting of appearanceSettings">
              <div class="sr-info">
                <div class="sr-label">{{ setting.label }}</div>
                <div class="sr-desc">{{ setting.desc }}</div>
              </div>
              <div class="toggle-switch" [class.on]="setting.on" (click)="setting.on = !setting.on">
                <div class="toggle-knob"></div>
              </div>
            </div>
          </div>

          <!-- Privacy -->
          <div *ngIf="activeTab() === 'privacy'" class="settings-panel">
            <div class="sp-title">Privacy & Data</div>
            <div class="sp-desc">Control your privacy settings and data preferences.</div>

            <div class="setting-row" *ngFor="let setting of privacySettings">
              <div class="sr-info">
                <div class="sr-label">{{ setting.label }}</div>
                <div class="sr-desc">{{ setting.desc }}</div>
              </div>
              <div class="toggle-switch" [class.on]="setting.on" (click)="setting.on = !setting.on">
                <div class="toggle-knob"></div>
              </div>
            </div>

            <div class="sp-divider"></div>
            <div class="sp-title">Data & Export</div>

            <div class="data-actions">
              <div class="da-item">
                <div class="da-info">
                  <div class="da-label">Download Your Data</div>
                  <div class="da-desc">Export all your sessions, reports, and progress data.</div>
                </div>
                <button class="btn btn-secondary btn-sm">⬇ Export</button>
              </div>
              <div class="da-item">
                <div class="da-info">
                  <div class="da-label">Delete All Data</div>
                  <div class="da-desc">Permanently remove all your data from interV.</div>
                </div>
                <button class="btn btn-sm" style="background:var(--error-50);color:var(--error-600);border:1px solid var(--error-200);">Delete</button>
              </div>
            </div>
          </div>

          <!-- Subscription -->
          <div *ngIf="activeTab() === 'subscription'" class="settings-panel">
            <div class="sp-title">Subscription & Billing</div>
            <div class="sp-desc">Manage your plan and billing information.</div>

            <div class="current-plan">
              <div class="cp-left">
                <div class="cp-plan-name">
                  {{ currentUser?.plan === 'PREMIUM' ? '⭐ Premium Plan' : currentUser?.plan === 'STUDENT' ? '🎓 Student Plan' : 'Free Plan' }}
                </div>
                <div class="cp-plan-price">{{ currentUser?.plan === 'FREE' ? '$0' : '$19' }} / month</div>
                <div class="cp-plan-renewal">
                  {{ currentUser?.subscriptionActive ? 'Subscription active' : 'No active subscription' }}
                </div>
              </div>
              <div class="cp-actions">
                <button class="btn btn-secondary btn-sm">Change Plan</button>
                <button class="btn btn-ghost btn-sm" style="color:var(--error-500);">Cancel</button>
              </div>
            </div>

            <div class="sp-divider"></div>
            <div class="sp-title">Payment Method</div>

            <div class="payment-method">
              <div class="pm-card">
                <span>💳</span>
                <div>
                  <div class="pm-card-num">Visa ending in 4242</div>
                  <div class="pm-card-exp">Expires 12/2027</div>
                </div>
              </div>
              <button class="btn btn-ghost btn-sm">Update</button>
            </div>

            <div class="sp-divider"></div>
            <div class="sp-title">Billing History</div>

            <div class="billing-table">
              <div class="bt-row" *ngFor="let invoice of invoices">
                <span class="bt-date">{{ invoice.date }}</span>
                <span class="bt-desc">{{ invoice.desc }}</span>
                <span class="bt-amount">{{ invoice.amount }}</span>
                <button class="btn btn-ghost btn-sm">PDF</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-page { display: flex; flex-direction: column; gap: var(--space-6); }

    .saved-toast {
      background: var(--success-50); border: 1px solid var(--success-200);
      color: var(--success-700); padding: var(--space-3) var(--space-5);
      border-radius: var(--radius-md); font-size: var(--text-sm); font-weight: 600;
      animation: fadeInUp 0.3s ease both;
    }

    .error-toast {
      background: var(--error-50); border: 1px solid var(--error-200);
      color: var(--error-700); padding: var(--space-3) var(--space-5);
      border-radius: var(--radius-md); font-size: var(--text-sm); font-weight: 600;
    }

    .settings-layout {
      display: grid;
      grid-template-columns: 220px 1fr;
      gap: var(--space-6);
      align-items: start;
    }

    /* Settings nav */
    .settings-nav {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
      position: sticky;
      top: calc(68px + var(--space-6));
    }

    .sn-item {
      display: flex; align-items: center; gap: var(--space-3);
      padding: var(--space-3) var(--space-4);
      border-radius: var(--radius-md);
      font-size: var(--text-sm); font-weight: var(--weight-medium);
      color: var(--color-text-muted);
      background: none; border: none; cursor: pointer;
      font-family: var(--font-body); text-align: left;
      transition: all var(--transition-fast);
    }
    .sn-item:hover { background: var(--neutral-50); color: var(--color-text); }
    .sn-item.active { background: var(--teal-50); color: var(--teal-700); font-weight: 600; }

    /* Settings content */
    .settings-content {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-8);
    }

    .settings-panel { display: flex; flex-direction: column; gap: var(--space-5); }
    .sp-title { font-size: var(--text-lg); font-weight: 700; color: var(--color-text); }
    .sp-desc { font-size: var(--text-sm); color: var(--color-text-muted); margin-top: calc(-1 * var(--space-3)); line-height: var(--leading-relaxed); }
    .sp-divider { height: 1px; background: var(--color-border); margin: var(--space-2) 0; }

    /* Skeleton */
    .account-skeleton { display: flex; flex-direction: column; gap: var(--space-3); }
    .sk-line {
      border-radius: var(--radius-sm);
      background: linear-gradient(90deg, var(--neutral-100) 25%, var(--neutral-50) 50%, var(--neutral-100) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

    /* Forms */
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); }
    .form-group { display: flex; flex-direction: column; gap: var(--space-2); }
    .form-group.full-width { grid-column: 1 / -1; }
    .form-group label { font-size: var(--text-sm); font-weight: 600; color: var(--color-text); }
    .field-hint { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px; }

    /* Toggle */
    .toggle-switch {
      width: 44px; height: 24px; background: var(--neutral-200);
      border-radius: var(--radius-full); cursor: pointer; position: relative;
      transition: background var(--transition-base); flex-shrink: 0;
    }
    .toggle-switch.on { background: var(--teal-500); }
    .toggle-knob {
      position: absolute; width: 18px; height: 18px; background: white;
      border-radius: var(--radius-full); top: 3px; left: 3px;
      transition: transform var(--transition-base); box-shadow: var(--shadow-sm);
    }
    .toggle-switch.on .toggle-knob { transform: translateX(20px); }

    /* Settings row */
    .setting-row {
      display: flex; align-items: center; justify-content: space-between;
      gap: var(--space-6); padding: var(--space-4) 0;
      border-bottom: 1px solid var(--color-border-light);
    }
    .setting-row:last-child { border-bottom: none; }
    .sr-info { flex: 1; }
    .sr-label { font-size: var(--text-sm); font-weight: 600; margin-bottom: 2px; }
    .sr-desc { font-size: var(--text-xs); color: var(--color-text-muted); line-height: var(--leading-relaxed); }

    /* Theme */
    .theme-options { display: flex; gap: var(--space-2); }
    .theme-btn {
      padding: var(--space-2) var(--space-4);
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: var(--text-sm); font-weight: 600;
      background: white; cursor: pointer; font-family: var(--font-body);
      transition: all var(--transition-fast);
    }
    .theme-btn:hover { border-color: var(--teal-300); }
    .theme-btn.active { border-color: var(--teal-500); background: var(--teal-50); color: var(--teal-700); }

    /* Notifications */
    .notif-group { display: flex; flex-direction: column; gap: var(--space-1); }
    .ng-title { font-size: var(--text-xs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-muted); padding: var(--space-3) 0 var(--space-1); }
    .notif-item {
      display: flex; align-items: center; justify-content: space-between;
      padding: var(--space-4) 0; border-bottom: 1px solid var(--color-border-light); gap: var(--space-6);
    }
    .notif-item:last-child { border-bottom: none; }
    .ni-label { flex: 1; }
    .ni-name { font-size: var(--text-sm); font-weight: 600; }
    .ni-desc { font-size: var(--text-xs); color: var(--color-text-muted); }
    .ni-toggles { display: flex; gap: var(--space-6); }
    .ni-toggle-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .ni-channel-label { font-size: 0.65rem; font-weight: 600; text-transform: uppercase; color: var(--color-text-light); }

    /* Current plan */
    .current-plan {
      display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-4);
      background: linear-gradient(135deg, var(--teal-50), var(--cyan-50));
      border: 1px solid var(--teal-100); border-radius: var(--radius-lg);
      padding: var(--space-5);
    }
    .cp-plan-name { font-size: var(--text-lg); font-weight: 700; margin-bottom: 4px; }
    .cp-plan-price { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 700; color: var(--teal-600); }
    .cp-plan-renewal { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 4px; }
    .cp-actions { display: flex; gap: var(--space-2); flex-shrink: 0; }

    /* Payment */
    .payment-method { display: flex; align-items: center; justify-content: space-between; padding: var(--space-4); background: var(--neutral-50); border-radius: var(--radius-md); border: 1px solid var(--color-border-light); }
    .pm-card { display: flex; align-items: center; gap: var(--space-3); }
    .pm-card-num { font-size: var(--text-sm); font-weight: 600; }
    .pm-card-exp { font-size: var(--text-xs); color: var(--color-text-muted); }

    /* Billing table */
    .billing-table { display: flex; flex-direction: column; gap: 0; }
    .bt-row {
      display: grid; grid-template-columns: 120px 1fr 80px auto;
      align-items: center; padding: var(--space-3) 0;
      border-bottom: 1px solid var(--color-border-light); gap: var(--space-4); font-size: var(--text-sm);
    }
    .bt-row:last-child { border-bottom: none; }
    .bt-date { color: var(--color-text-muted); }
    .bt-amount { font-weight: 700; }

    /* Data actions */
    .data-actions { display: flex; flex-direction: column; gap: var(--space-3); }
    .da-item { display: flex; align-items: flex-start; justify-content: space-between; padding: var(--space-4); background: var(--neutral-50); border-radius: var(--radius-md); border: 1px solid var(--color-border-light); gap: var(--space-4); }
    .da-label { font-size: var(--text-sm); font-weight: 600; margin-bottom: 2px; }
    .da-desc { font-size: var(--text-xs); color: var(--color-text-muted); }

    @media (max-width: 1024px) {
      .settings-layout { grid-template-columns: 1fr; }
      .settings-nav { flex-direction: row; flex-wrap: wrap; position: static; }
      .form-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class SettingsComponent implements OnInit {
  private http = inject(HttpClient);

  activeTab = signal('account');
  saved = false;
  saveError = '';
  saving = false;
  theme = 'light';

  currentUser: any = null;
  isLoadingUser = true;

  editForm = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    city: '',
    bio: '',
    preferredIndustry: '',
    preferredLanguage: 'fr',
    emailNotificationsEnabled: true,
    pushNotificationsEnabled: false,
    profileVisible: true,
  };

  tabs = [
    { key: 'account',      icon: '👤', label: 'Account' },
    { key: 'notifications',icon: '🔔', label: 'Notifications' },
    { key: 'appearance',   icon: '🎨', label: 'Appearance' },
    { key: 'privacy',      icon: '🔒', label: 'Privacy' },
    { key: 'subscription', icon: '⭐', label: 'Subscription' },
  ];

  channels = ['Email', 'Push'];

  notificationGroups = [
    {
      title: 'Sessions & Practice',
      items: [
        { name: 'Session reminders',     desc: 'Get reminded before upcoming sessions',       enabled: true },
        { name: 'New session available',  desc: 'When new session slots open up',              enabled: false },
        { name: 'AI feedback ready',      desc: 'When your session report is generated',       enabled: true },
      ]
    },
    {
      title: 'Learning & Progress',
      items: [
        { name: 'Daily streak reminder', desc: 'Keep your streak alive',                      enabled: true },
        { name: 'Badge earned',          desc: 'When you earn a new badge',                   enabled: true },
        { name: 'Level up',              desc: 'When you reach a new XP level',               enabled: true },
      ]
    },
    {
      title: 'Community',
      items: [
        { name: 'New comments',          desc: 'When someone comments on your posts',         enabled: true },
        { name: 'New followers',         desc: 'When someone follows you',                    enabled: false },
        { name: 'Weekly digest',         desc: 'A summary of what\'s happening in community', enabled: true },
      ]
    }
  ];

  appearanceSettings = [
    { label: 'Compact Mode',         desc: 'Reduce spacing for a denser layout',             on: false },
    { label: 'Animations',           desc: 'Enable smooth transitions and micro-interactions',on: true },
    { label: 'Session Timer Sound',  desc: 'Play a sound when your session timer ends',       on: true },
  ];

  privacySettings = [
    { label: 'Public Profile',       desc: 'Allow other community members to see your profile',                    on: true },
    { label: 'Show on Leaderboard',  desc: 'Display your name and rank on the community leaderboard',              on: true },
    { label: 'Data Analytics',       desc: 'Help us improve by sharing anonymous usage data',                      on: true },
    { label: 'Marketing Emails',     desc: 'Receive product updates, tips, and promotional content',               on: false },
  ];

  invoices = [
    { date: 'Dec 24, 2024', desc: 'Premium Plan — Monthly',  amount: '$19.00' },
    { date: 'Nov 24, 2024', desc: 'Premium Plan — Monthly',  amount: '$19.00' },
    { date: 'Oct 24, 2024', desc: 'Premium Plan — Monthly',  amount: '$19.00' },
    { date: 'Sep 24, 2024', desc: 'Free to Premium Upgrade', amount: '$19.00' },
  ];

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/api/users/me`).subscribe({
      next: (user) => {
        this.currentUser = user;
        this.editForm = {
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          phoneNumber: user.phoneNumber || '',
          city: user.city || '',
          bio: user.bio || '',
          preferredIndustry: user.preferredIndustry || '',
          preferredLanguage: user.preferredLanguage || 'fr',
          emailNotificationsEnabled: user.emailNotificationsEnabled ?? true,
          pushNotificationsEnabled: user.pushNotificationsEnabled ?? false,
          profileVisible: user.profileVisible ?? true,
        };
        this.isLoadingUser = false;
      },
      error: () => { this.isLoadingUser = false; }
    });
  }

  setTab(key: string) {
    this.activeTab.set(key);
    this.saved = false;
    this.saveError = '';
  }

  saveCurrentTab(): void {
    if (this.activeTab() === 'account' || this.activeTab() === 'notifications') {
      this.saveProfile();
    } else {
      this.saved = true;
      setTimeout(() => this.saved = false, 3000);
    }
  }

  private saveProfile(): void {
    this.saving = true;
    this.saveError = '';
    this.http.put<any>(`${environment.apiUrl}/api/users/me`, this.editForm).subscribe({
      next: (updated) => {
        this.currentUser = updated;
        this.saving = false;
        this.saved = true;
        setTimeout(() => this.saved = false, 3000);
      },
      error: () => {
        this.saving = false;
        this.saveError = 'Failed to save changes. Please try again.';
      }
    });
  }
}
