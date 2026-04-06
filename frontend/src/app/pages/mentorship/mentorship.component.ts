import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { MentorCardComponent } from '../../shared/components/mentor-card/mentor-card.component';
import { MentorshipApiService } from '../../core/services/mentorship-api.service';
import { AuthService } from '../../core/auth/auth.service';
import { MentorRequest, MentorSession, Mentor } from '../../core/models/models';
import { MOCK_MENTORS } from '../../core/data/mock-data';

@Component({
  selector: 'app-mentorship',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, MentorCardComponent],
  template: `
    <div class="mentorship-page animate-fade">

      <!-- Page header -->
      <div class="page-header">
        <div>
          <h1>Mentorship</h1>
          <p *ngIf="!isMentor">Book 1:1 sessions with verified industry professionals.</p>
          <p *ngIf="isMentor">Manage your mentee requests and upcoming sessions.</p>
        </div>
        <div class="mentor-page-stats">
          <span class="chip chip-teal" *ngIf="!isMentor">🤝 {{ mentors.length }}+ Mentors</span>
          <span class="chip chip-mint" *ngIf="!isMentor">⭐ 4.8 Avg Rating</span>
          <span class="chip chip-teal" *ngIf="isMentor">📨 {{ incomingRequests().length }} Requests</span>
          <span class="chip chip-purple" *ngIf="isMentor">🎓 Mentor Dashboard</span>
        </div>
      </div>

      <!-- Error / Success messages -->
      <div class="card error-card" *ngIf="errorMessage()">⚠️ {{ errorMessage() }}</div>
      <div class="card success-card" *ngIf="successMessage()">✅ {{ successMessage() }}</div>

      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- MENTOR VIEW                                             -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <ng-container *ngIf="isMentor">

        <!-- Incoming requests -->
        <div class="card">
          <app-section-header title="Incoming Requests" icon="📨"></app-section-header>

          <div class="empty-state" *ngIf="incomingRequests().length === 0 && !loadingRequests()">
            <div class="empty-icon">📭</div>
            <div class="empty-title">No requests yet</div>
            <div class="empty-desc">When users request your mentorship, they'll appear here.</div>
          </div>

          <div class="loading-state" *ngIf="loadingRequests()">Loading requests...</div>

          <div class="requests-list" *ngIf="incomingRequests().length > 0">
            <div class="request-item mentor-request-item" *ngFor="let req of incomingRequests()">

              <div class="request-avatar">
                <div class="avatar-placeholder" style="width:40px;height:40px;font-size:0.85rem;">U</div>
              </div>

              <div class="request-info">
                <span class="request-mentor">Mentee ID: {{ req.menteeId }}</span>
                <span class="request-date">{{ req.createdAt | date:'mediumDate' }}</span>
              </div>

              <span class="chip"
                    [class.chip-teal]="req.status === 'ACCEPTED'"
                    [class.chip-neutral]="req.status === 'PENDING'"
                    [class.chip-error]="req.status === 'DECLINED'">
                {{ req.status }}
              </span>

              <!-- PENDING: accept / decline -->
              <div class="request-actions" *ngIf="req.status === 'PENDING'">
                <button class="btn btn-primary btn-sm"
                        [disabled]="processingId() === req.id"
                        (click)="acceptRequest(req.id)">
                  {{ processingId() === req.id ? 'Processing...' : '✓ Accept' }}
                </button>
                <button class="btn btn-ghost btn-sm"
                        [disabled]="processingId() === req.id"
                        (click)="declineRequest(req.id)">
                  ✕ Decline
                </button>
              </div>

              <!-- ACCEPTED + no session yet: schedule -->
              <div class="request-actions"
                   *ngIf="req.status === 'ACCEPTED' && !getSession(req.id)">
                <button class="btn btn-primary btn-sm"
                        (click)="openScheduleModal(req.id)">
                  📅 Schedule Session
                </button>
              </div>

              <!-- ACCEPTED + session exists: view session -->
              <div class="request-actions"
                   *ngIf="req.status === 'ACCEPTED' && getSession(req.id)">
                <button class="btn btn-teal btn-sm"
                        (click)="toggleViewSession(req.id)">
                  {{ viewingSessionId() === req.id ? '▲ Hide Session' : '👁 View Session' }}
                </button>
              </div>

            </div>
          </div>
        </div>

        <!-- Session detail panel -->
        <div class="card session-panel" *ngIf="viewingSessionId() && getSession(viewingSessionId()!)">
          <app-section-header title="Session Details" icon="📅"></app-section-header>

          <ng-container *ngIf="!editMode()">
            <!-- View mode -->
            <div class="session-details">
              <div class="session-detail-row">
                <span class="session-label">📅 Date & Time</span>
                <span class="session-value">
                  {{ getSession(viewingSessionId()!)!.scheduledAt | date:'full' }}
                </span>
              </div>
              <div class="session-detail-row">
                <span class="session-label">🔗 Meeting Link</span>
                <a [href]="getSession(viewingSessionId()!)!.meetingLink"
                   target="_blank"
                   class="session-link">
                  {{ getSession(viewingSessionId()!)!.meetingLink }}
                </a>
              </div>
              <div class="session-detail-row">
                <span class="session-label">📊 Status</span>
                <span class="chip chip-teal">
                  {{ getSession(viewingSessionId()!)!.status }}
                </span>
              </div>
            </div>
            <div class="session-actions">
              <button class="btn btn-primary" (click)="enterEditMode()">
                ✏️ Edit Session
              </button>
              <button class="btn btn-ghost"
                      (click)="cancelActiveSession(getSession(viewingSessionId()!)!.id)">
                🗑 Cancel Session
              </button>
              <a [href]="getSession(viewingSessionId()!)!.meetingLink"
                 target="_blank"
                 class="btn btn-teal">
                🚀 Join Call
              </a>
            </div>
          </ng-container>

          <ng-container *ngIf="editMode()">
            <!-- Edit mode -->
            <div class="schedule-form">
              <div class="form-group">
                <label class="form-label">New Date & Time</label>
                <input type="datetime-local" class="input"
                       [value]="scheduledAt"
                       (change)="scheduledAt = $any($event.target).value">
              </div>
              <div class="form-group">
                <label class="form-label">New Meeting Link</label>
                <input type="url" class="input"
                       placeholder="https://meet.google.com/..."
                       [value]="meetingLink"
                       (input)="meetingLink = $any($event.target).value">
              </div>
              <div class="schedule-actions">
                <button class="btn btn-primary"
                        [disabled]="!scheduledAt || !meetingLink || schedulingSession()"
                        (click)="rescheduleSession()">
                  {{ schedulingSession() ? 'Saving...' : '💾 Save Changes' }}
                </button>
                <button class="btn btn-ghost" (click)="exitEditMode()">
                  Cancel
                </button>
              </div>
            </div>
          </ng-container>
        </div>

        <!-- Schedule NEW session modal (no session yet) -->
        <div class="card schedule-card" *ngIf="schedulingRequestId()">
          <app-section-header title="Schedule a Session" icon="📅"></app-section-header>
          <div class="schedule-form">
            <div class="form-group">
              <label class="form-label">Date & Time</label>
              <input type="datetime-local" class="input"
                     [value]="scheduledAt"
                     (change)="scheduledAt = $any($event.target).value">
            </div>
            <div class="form-group">
              <label class="form-label">Meeting Link</label>
              <input type="url" class="input"
                     placeholder="https://meet.google.com/..."
                     [value]="meetingLink"
                     (input)="meetingLink = $any($event.target).value">
            </div>
            <div class="schedule-actions">
              <button class="btn btn-primary"
                      [disabled]="!scheduledAt || !meetingLink || schedulingSession()"
                      (click)="scheduleSession()">
                {{ schedulingSession() ? 'Scheduling...' : 'Confirm Session' }}
              </button>
              <button class="btn btn-ghost" (click)="closeScheduleModal()">Cancel</button>
            </div>
          </div>
        </div>

      </ng-container>

      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- MENTEE VIEW                                             -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <ng-container *ngIf="!isMentor">

        <!-- Upcoming session -->
        <div class="card upcoming-session" *ngIf="upcomingSession()">
          <div class="us-header">
            <span class="chip chip-teal">📅 Upcoming Session</span>
          </div>
          <div class="us-body">
            <div class="avatar-placeholder" style="width:52px;height:52px;font-size:1rem;">M</div>
            <div class="us-info">
              <div class="us-mentor-name">Scheduled Session</div>
              <div class="us-mentor-role">{{ upcomingSession()!.meetingLink }}</div>
              <div class="us-meta">
                <span>📅 {{ upcomingSession()!.scheduledAt | date:'medium' }}</span>
                <span class="chip chip-cyan">Video Call</span>
              </div>
            </div>
            <div class="us-actions">
              <a [href]="upcomingSession()!.meetingLink" target="_blank" class="btn btn-primary">
                Join Call
              </a>
              <button class="btn btn-ghost btn-sm"
                      (click)="cancelSession(upcomingSession()!.id)">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <!-- My sent requests -->
        <div class="card" *ngIf="myRequests().length > 0">
          <app-section-header title="My Mentor Requests" icon="📨"></app-section-header>
          <div class="requests-list">
            <div class="request-item" *ngFor="let req of myRequests()">
              <div class="request-info">
                <span class="request-mentor">Mentor ID: {{ req.mentorId }}</span>
                <span class="chip"
                      [class.chip-teal]="req.status === 'ACCEPTED'"
                      [class.chip-neutral]="req.status === 'PENDING'"
                      [class.chip-error]="req.status === 'DECLINED'">
                  {{ req.status }}
                </span>
              </div>
              <div class="request-date">{{ req.createdAt | date:'mediumDate' }}</div>
              <button class="btn btn-ghost btn-sm"
                      *ngIf="req.status === 'PENDING'"
                      (click)="cancelRequest(req.id)">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <!-- Filters + Search -->
        <div class="mentors-controls">
          <div class="input-icon-wrap" style="flex:1;max-width:380px;">
            <span class="icon">🔍</span>
            <input class="input" placeholder="Search by name, expertise, company...">
          </div>
          <div class="mentor-filters">
            <button class="chip"
                    [class]="activeFilter() === 'all' ? 'chip-teal' : 'chip-neutral'"
                    (click)="setFilter('all')">All Mentors</button>
            <button class="chip"
                    [class]="activeFilter() === 'available' ? 'chip-teal' : 'chip-neutral'"
                    (click)="setFilter('available')">Available Now</button>
            <button class="chip"
                    [class]="activeFilter() === 'behavioral' ? 'chip-teal' : 'chip-neutral'"
                    (click)="setFilter('behavioral')">Behavioral</button>
            <button class="chip"
                    [class]="activeFilter() === 'technical' ? 'chip-teal' : 'chip-neutral'"
                    (click)="setFilter('technical')">Technical</button>
            <button class="chip"
                    [class]="activeFilter() === 'pm' ? 'chip-teal' : 'chip-neutral'"
                    (click)="setFilter('pm')">Product</button>
          </div>
          <select class="input" style="width:auto;padding:0.5rem 1rem;">
            <option>Sort: Top Rated</option>
            <option>Sort: Most Sessions</option>
            <option>Sort: Price: Low</option>
            <option>Sort: Availability</option>
          </select>
        </div>

        <!-- Mentor grid -->
        <div class="mentors-grid">
          <app-mentor-card
              *ngFor="let mentor of displayedMentors"
              [mentor]="mentor"
              [requested]="hasRequestFor(mentor.id)"
              [requesting]="requestingId() === mentor.id"
              (requestClicked)="sendRequest($event)">
          </app-mentor-card>
        </div>

        <!-- How it works -->
        <div class="card how-mentorship-works">
          <app-section-header title="How Mentorship Works" icon="💡"></app-section-header>
          <div class="hmw-steps">
            <div class="hmw-step" *ngFor="let step of howItWorks">
              <div class="hmw-icon">{{ step.icon }}</div>
              <div class="hmw-title">{{ step.title }}</div>
              <div class="hmw-desc">{{ step.desc }}</div>
            </div>
          </div>
        </div>

      </ng-container>

    </div>
  `,
  styles: [`
    .mentorship-page { display: flex; flex-direction: column; gap: var(--space-6); }
    .mentor-page-stats { display: flex; gap: var(--space-3); }

    /* Upcoming session */
    .upcoming-session { background: linear-gradient(135deg, var(--teal-50), white); border-color: var(--teal-100); }
    .us-header { margin-bottom: var(--space-4); }
    .us-body { display: flex; align-items: flex-start; gap: var(--space-4); }
    .us-info { flex: 1; }
    .us-mentor-name { font-size: var(--text-lg); font-weight: 700; margin-bottom: 2px; }
    .us-mentor-role { font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-3); }
    .us-meta { display: flex; gap: var(--space-4); font-size: var(--text-sm); color: var(--color-text-muted); align-items: center; flex-wrap: wrap; }
    .us-actions { display: flex; flex-direction: column; gap: var(--space-2); flex-shrink: 0; }

    /* Requests list */
    .requests-list { display: flex; flex-direction: column; gap: var(--space-3); margin-top: var(--space-4); }
    .request-item { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
    .mentor-request-item { flex-wrap: wrap; }
    .request-avatar { flex-shrink: 0; }
    .request-info { display: flex; flex-direction: column; gap: 2px; flex: 1; }
    .request-mentor { font-weight: 600; font-size: var(--text-sm); }
    .request-date { font-size: var(--text-xs); color: var(--color-text-muted); }
    .request-actions { display: flex; gap: var(--space-2); flex-shrink: 0; }

    /* Empty / loading */
    .empty-state { display: flex; flex-direction: column; align-items: center; padding: var(--space-10) var(--space-6); text-align: center; gap: var(--space-2); }
    .empty-icon { font-size: 2.5rem; }
    .empty-title { font-weight: 700; font-size: var(--text-base); }
    .empty-desc { font-size: var(--text-sm); color: var(--color-text-muted); }
    .loading-state { padding: var(--space-6); text-align: center; color: var(--color-text-muted); font-size: var(--text-sm); }

    /* Session panel */
    .session-panel { border-color: var(--teal-200); background: linear-gradient(135deg, var(--teal-50), white); }
    .session-details { display: flex; flex-direction: column; gap: var(--space-4); margin-top: var(--space-4); }
    .session-detail-row { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-3); background: white; border-radius: var(--radius-md); border: 1px solid var(--color-border); }
    .session-label { font-size: var(--text-sm); font-weight: 600; color: var(--color-text-muted); min-width: 130px; }
    .session-value { font-size: var(--text-sm); font-weight: 500; color: var(--color-text); }
    .session-link { font-size: var(--text-sm); color: var(--teal-600); text-decoration: underline; word-break: break-all; }
    .session-actions { display: flex; gap: var(--space-3); margin-top: var(--space-5); flex-wrap: wrap; }

    /* Schedule form */
    .schedule-card { border: 2px dashed var(--teal-200); background: var(--teal-50); }
    .schedule-form { display: flex; flex-direction: column; gap: var(--space-4); margin-top: var(--space-4); }
    .form-group { display: flex; flex-direction: column; gap: var(--space-2); }
    .form-label { font-size: var(--text-sm); font-weight: 600; color: var(--color-text); }
    .schedule-actions { display: flex; gap: var(--space-3); }

    /* Messages */
    .error-card { background: var(--error-50); border-color: var(--error-500); color: var(--error-500); }
    .success-card { background: var(--teal-50); border-color: var(--teal-200); color: var(--teal-700); }

    /* Controls */
    .mentors-controls { display: flex; gap: var(--space-4); align-items: center; flex-wrap: wrap; }
    .mentor-filters { display: flex; gap: var(--space-2); flex-wrap: wrap; }
    .mentor-filters .chip { cursor: pointer; }

    /* Mentor grid */
    .mentors-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-5); }

    /* How it works */
    .hmw-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); text-align: center; }
    .hmw-icon { font-size: 2rem; margin-bottom: var(--space-3); }
    .hmw-title { font-size: var(--text-sm); font-weight: 700; margin-bottom: var(--space-2); }
    .hmw-desc { font-size: var(--text-sm); color: var(--color-text-muted); line-height: var(--leading-relaxed); }

    /* Extra chips */
    .chip-purple { background: #ede9fe; color: #6d28d9; border-color: #c4b5fd; }
    .btn-teal { background: var(--teal-600); color: white; border: none; }
    .btn-teal:hover { background: var(--teal-700); }

    /* Responsive */
    @media (max-width: 1200px) { .mentors-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) {
      .mentors-grid { grid-template-columns: 1fr; }
      .hmw-steps { grid-template-columns: repeat(2, 1fr); }
      .us-body { flex-direction: column; }
      .session-detail-row { flex-direction: column; align-items: flex-start; }
      .session-actions { flex-direction: column; }
    }
  `]
})
export class MentorshipComponent implements OnInit {
  private mentorshipApi = inject(MentorshipApiService);
  private authService = inject(AuthService);

  isMentor = this.authService.hasRole('ROLE_MENTOR');

  // shared
  mentors = MOCK_MENTORS;
  activeFilter = signal('all');
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  // mentee
  myRequests = signal<MentorRequest[]>([]);
  upcomingSession = signal<MentorSession | null>(null);
  requestingId = signal<string | null>(null);

  // mentor
  incomingRequests = signal<MentorRequest[]>([]);
  loadingRequests = signal(false);
  processingId = signal<string | null>(null);
  sessionMap = signal<Map<string, MentorSession>>(new Map());
  schedulingRequestId = signal<string | null>(null);
  schedulingSession = signal(false);
  viewingSessionId = signal<string | null>(null);
  editMode = signal(false);
  scheduledAt = '';
  meetingLink = '';

  get displayedMentors(): Mentor[] {
    if (this.activeFilter() === 'available') return this.mentors.filter(m => m.available);
    return this.mentors;
  }

  ngOnInit() {
    this.isMentor ? this.loadIncomingRequests() : this.loadMyRequests();
  }

  // ── helpers ───────────────────────────────────────────────────

  getSession(requestId: string): MentorSession | undefined {
    return this.sessionMap().get(requestId);
  }

  // ── MENTOR ────────────────────────────────────────────────────

  loadIncomingRequests() {
    const keycloakId = this.authService.getKeycloakId();
    if (!keycloakId) return;
    this.loadingRequests.set(true);

    this.mentorshipApi.getRequestsByMentor(keycloakId).subscribe({
      next: (requests) => {
        this.incomingRequests.set(requests);
        this.loadingRequests.set(false);
        // load sessions for all accepted requests
        requests
            .filter(r => r.status === 'ACCEPTED')
            .forEach(r => {
              this.mentorshipApi.getSessionsByRequest(r.id).subscribe({
                next: (sessions) => {
                  const active = sessions.find(s => s.status === 'SCHEDULED');
                  if (active) {
                    this.sessionMap.update(map => {
                      const newMap = new Map(map);
                      newMap.set(r.id, active);
                      return newMap;
                    });
                  }
                }
              });
            });
      },
      error: () => this.loadingRequests.set(false)
    });
  }

  acceptRequest(requestId: string) {
    this.processingId.set(requestId);
    this.mentorshipApi.acceptRequest(requestId).subscribe({
      next: (updated) => {
        this.incomingRequests.update(reqs => reqs.map(r => r.id === requestId ? updated : r));
        this.processingId.set(null);
        this.showSuccess('Request accepted! You can now schedule a session.');
      },
      error: () => { this.processingId.set(null); this.showError('Failed to accept request.'); }
    });
  }

  declineRequest(requestId: string) {
    this.processingId.set(requestId);
    this.mentorshipApi.declineRequest(requestId).subscribe({
      next: (updated) => {
        this.incomingRequests.update(reqs => reqs.map(r => r.id === requestId ? updated : r));
        this.processingId.set(null);
        this.showSuccess('Request declined.');
      },
      error: () => { this.processingId.set(null); this.showError('Failed to decline request.'); }
    });
  }

  openScheduleModal(requestId: string) {
    this.schedulingRequestId.set(requestId);
    this.viewingSessionId.set(null);
    this.scheduledAt = '';
    this.meetingLink = '';
  }

  closeScheduleModal() {
    this.schedulingRequestId.set(null);
    this.scheduledAt = '';
    this.meetingLink = '';
  }

  scheduleSession() {
    const requestId = this.schedulingRequestId();
    if (!requestId || !this.scheduledAt || !this.meetingLink) return;
    this.schedulingSession.set(true);

    this.mentorshipApi.createSession({
      requestId,
      scheduledAt: this.scheduledAt,
      meetingLink: this.meetingLink
    }).subscribe({
      next: (session) => {
        this.sessionMap.update(map => {
          const newMap = new Map(map);
          newMap.set(requestId, session);
          return newMap;
        });
        this.schedulingSession.set(false);
        this.closeScheduleModal();
        this.showSuccess('Session scheduled successfully!');
      },
      error: (err) => {
        this.schedulingSession.set(false);
        this.showError(err.error?.error ?? 'Failed to schedule session.');
      }
    });
  }

  toggleViewSession(requestId: string) {
    if (this.viewingSessionId() === requestId) {
      this.viewingSessionId.set(null);
      this.editMode.set(false);
    } else {
      this.viewingSessionId.set(requestId);
      this.schedulingRequestId.set(null);
      this.editMode.set(false);
    }
  }

  enterEditMode() {
    const session = this.getSession(this.viewingSessionId()!);
    if (!session) return;
    // pre-fill fields with current values
    this.scheduledAt = session.scheduledAt.slice(0, 16); // format for datetime-local input
    this.meetingLink = session.meetingLink;
    this.editMode.set(true);
  }

  exitEditMode() {
    this.editMode.set(false);
    this.scheduledAt = '';
    this.meetingLink = '';
  }

  rescheduleSession() {
    const requestId = this.viewingSessionId();
    const session = requestId ? this.getSession(requestId) : null;
    if (!session || !this.scheduledAt || !this.meetingLink) return;
    this.schedulingSession.set(true);

    // cancel old session then create new one
    this.mentorshipApi.cancelSession(session.id).subscribe({
      next: () => {
        this.mentorshipApi.createSession({
          requestId: session.requestId,
          scheduledAt: this.scheduledAt,
          meetingLink: this.meetingLink
        }).subscribe({
          next: (newSession) => {
            this.sessionMap.update(map => {
              const newMap = new Map(map);
              newMap.set(session.requestId, newSession);
              return newMap;
            });
            this.schedulingSession.set(false);
            this.editMode.set(false);
            this.scheduledAt = '';
            this.meetingLink = '';
            this.showSuccess('Session updated successfully!');
          },
          error: (err) => {
            this.schedulingSession.set(false);
            this.showError(err.error?.error ?? 'Failed to create new session.');
          }
        });
      },
      error: () => {
        this.schedulingSession.set(false);
        this.showError('Failed to cancel old session.');
      }
    });
  }

  cancelActiveSession(sessionId: string) {
    const requestId = this.viewingSessionId();
    this.mentorshipApi.cancelSession(sessionId).subscribe({
      next: () => {
        if (requestId) {
          this.sessionMap.update(map => {
            const newMap = new Map(map);
            newMap.delete(requestId);
            return newMap;
          });
        }
        this.viewingSessionId.set(null);
        this.editMode.set(false);
        this.showSuccess('Session cancelled.');
      },
      error: () => this.showError('Failed to cancel session.')
    });
  }

  // ── MENTEE ────────────────────────────────────────────────────

  loadMyRequests() {
    const keycloakId = this.authService.getKeycloakId();
    if (!keycloakId) return;

    this.mentorshipApi.getRequestsByMentee(keycloakId).subscribe({
      next: (requests) => {
        this.myRequests.set(requests);
        const accepted = requests.find(r => r.status === 'ACCEPTED');
        if (accepted) {
          this.mentorshipApi.getSessionsByRequest(accepted.id).subscribe({
            next: (sessions) => {
              this.upcomingSession.set(sessions.find(s => s.status === 'SCHEDULED') ?? null);
            }
          });
        }
      },
      error: () => {}
    });
  }

  sendRequest(mentorId: string) {
    this.clearMessages();
    this.requestingId.set(mentorId);
    this.mentorshipApi.sendRequest({ mentorId }).subscribe({
      next: (req) => {
        this.myRequests.update(reqs => [...reqs, req]);
        this.requestingId.set(null);
        this.showSuccess('Request sent successfully!');
      },
      error: (err) => {
        this.requestingId.set(null);
        this.showError(err.error?.error ?? 'Failed to send request.');
      }
    });
  }

  cancelRequest(requestId: string) {
    this.mentorshipApi.deleteRequest(requestId).subscribe({
      next: () => {
        this.myRequests.update(reqs => reqs.filter(r => r.id !== requestId));
        this.showSuccess('Request cancelled.');
      },
      error: () => this.showError('Failed to cancel request.')
    });
  }

  cancelSession(sessionId: string) {
    this.mentorshipApi.cancelSession(sessionId).subscribe({
      next: () => {
        this.upcomingSession.set(null);
        this.showSuccess('Session cancelled.');
      },
      error: () => this.showError('Failed to cancel session.')
    });
  }

  hasRequestFor(mentorId: string): boolean {
    return this.myRequests().some(r => r.mentorId === mentorId && r.status === 'PENDING');
  }

  // ── shared ────────────────────────────────────────────────────

  setFilter(f: string) { this.activeFilter.set(f); }

  private showSuccess(msg: string) {
    this.successMessage.set(msg);
    setTimeout(() => this.successMessage.set(null), 3000);
  }

  private showError(msg: string) {
    this.errorMessage.set(msg);
    setTimeout(() => this.errorMessage.set(null), 4000);
  }

  private clearMessages() {
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }

  howItWorks = [
    { icon: '🔍', title: 'Browse Mentors', desc: 'Filter by expertise, company, rating and availability.' },
    { icon: '📅', title: 'Book a Session', desc: 'Choose a time slot that works for you and your mentor.' },
    { icon: '🎙️', title: 'Meet & Practice', desc: 'Join a live 1:1 video session with your mentor.' },
    { icon: '📊', title: 'Get Feedback', desc: 'Receive personalized feedback and an action plan.' },
  ];
}