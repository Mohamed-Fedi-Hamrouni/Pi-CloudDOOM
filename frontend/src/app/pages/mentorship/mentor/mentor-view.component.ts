import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { JitsiMeetComponent } from '../../../shared/components/jitsi-meet/jitsi-meet.component';
import { MentorshipApiService } from '../../../core/services/mentorship-api.service';
import { UserApiService } from '../../../core/services/user-api.service';
import { MentorRequest, MentorSession } from '../../../core/models/models';

@Component({
    selector: 'app-mentor-view',
    standalone: true,
    imports: [CommonModule, SectionHeaderComponent, FullCalendarModule, JitsiMeetComponent],
    template: `
    <div class="mentorship-page animate-fade">

      <!-- Header -->
      <div class="page-header">
        <div>
          <h1>Mentorship</h1>
          <p>Manage your mentee requests and upcoming sessions.</p>
        </div>
        <div class="mentor-page-stats">
          <span class="chip chip-teal">📨 {{ pendingCount() }} Pending</span>
          <span class="chip chip-purple">🎓 Mentor Dashboard</span>
          <button 
            class="btn btn-sm"
            [class.btn-primary]="isAvailable()"
            [class.btn-ghost]="!isAvailable()"
            [disabled]="togglingAvailability()"
            (click)="toggleAvailability()">
            {{ isAvailable() ? '🟢 Available' : '🔴 Unavailable' }}
          </button>
        </div>
      </div>

      <!-- Messages -->
      <div class="card error-card" *ngIf="errorMessage()">⚠️ {{ errorMessage() }}</div>
      <div class="card success-card" *ngIf="successMessage()">✅ {{ successMessage() }}</div>

      <!-- Embedded meeting -->
      <div class="card" *ngIf="activeRoomName()">
        <app-section-header title="Live Session" icon="🎥"></app-section-header>
        <div style="display:flex;justify-content:flex-end;gap:0.5rem;margin-bottom:0.75rem;">
          <button class="btn btn-ghost btn-sm" (click)="closeJitsi()">Close</button>
        </div>
        <app-jitsi-meet [roomName]="activeRoomName()!" [displayName]="displayName()"></app-jitsi-meet>
      </div>

      <!-- Calendar -->
      <div class="card">
        <app-section-header title="My Calendar" icon="🗓️"></app-section-header>

        <div class="empty-state" *ngIf="calendarEvents().length === 0">
          <div class="empty-icon">🗓️</div>
          <div class="empty-title">No scheduled sessions</div>
          <div class="empty-desc">Scheduled mentorship sessions will appear here.</div>
        </div>

        <full-calendar *ngIf="calendarEvents().length > 0" [options]="calendarOptions()"></full-calendar>
      </div>

      <!-- Incoming requests -->
      <div class="card">
        <app-section-header title="Incoming Requests" icon="📨"></app-section-header>

        <div class="loading-state" *ngIf="loadingRequests()">Loading requests...</div>

        <div class="empty-state"
          *ngIf="!loadingRequests() && incomingRequests().length === 0">
          <div class="empty-icon">📭</div>
          <div class="empty-title">No requests yet</div>
          <div class="empty-desc">When users request your mentorship, they'll appear here.</div>
        </div>

        <div class="requests-list" *ngIf="incomingRequests().length > 0">
          <div class="request-block" *ngFor="let req of incomingRequests()">

            <!-- Request row -->
            <div class="request-item">
              <div class="request-avatar">
                <div class="avatar-placeholder"
                  style="width:40px;height:40px;font-size:0.85rem;">U</div>
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

              <!-- PENDING actions -->
              <div class="request-actions" *ngIf="req.status === 'PENDING'">
                <button class="btn btn-primary btn-sm"
                  [disabled]="processingId() === req.id"
                  (click)="acceptRequest(req.id)">
                  {{ processingId() === req.id ? '...' : '✓ Accept' }}
                </button>
                <button class="btn btn-ghost btn-sm"
                  [disabled]="processingId() === req.id"
                  (click)="declineRequest(req.id)">
                  ✕ Decline
                </button>
              </div>

              <!-- ACCEPTED actions -->
              <div class="request-actions" *ngIf="req.status === 'ACCEPTED'">
                <button class="btn btn-primary btn-sm"
                  *ngIf="!getSession(req.id)"
                  (click)="openScheduleModal(req.id)">
                  📅 Schedule
                </button>
                <button class="btn btn-teal btn-sm"
                  *ngIf="getSession(req.id)"
                  (click)="toggleSession(req.id)">
                  {{ viewingId() === req.id ? '▲ Hide' : '👁 Session' }}
                </button>
                <button class="btn btn-ghost btn-sm"
                  [disabled]="processingId() === req.id"
                  (click)="deleteRequest(req.id)">
                  🗑 Delete
                </button>
              </div>

              <!-- DECLINED actions -->
              <div class="request-actions" *ngIf="req.status === 'DECLINED'">
                <button class="btn btn-ghost btn-sm"
                  [disabled]="processingId() === req.id"
                  (click)="deleteRequest(req.id)">
                  🗑 Delete
                </button>
              </div>
            </div>

            <!-- Session detail panel -->
            <div class="session-panel"
              *ngIf="viewingId() === req.id && getSession(req.id)">

              <ng-container *ngIf="!editMode()">
                <div class="session-details">
                  <div class="session-row">
                    <span class="session-label">📅 Date & Time</span>
                    <span class="session-value">
                      {{ getSession(req.id)!.scheduledAt | date:'full' }}
                    </span>
                  </div>
                  <div class="session-row">
                    <span class="session-label">🎥 Room Name</span>
                    <span class="session-value">{{ getSession(req.id)!.meetingLink }}</span>
                  </div>
                  <div class="session-row">
                    <span class="session-label">📊 Status</span>
                    <span class="chip chip-teal">{{ getSession(req.id)!.status }}</span>
                  </div>
                </div>
                <div class="session-actions">
                  <button class="btn btn-primary btn-sm" (click)="enterEditMode(req.id)">
                    ✏️ Edit
                  </button>
                  <button class="btn btn-ghost btn-sm"
                    *ngIf="getSession(req.id)!.status === 'SCHEDULED'"
                    (click)="cancelActiveSession(getSession(req.id)!.id, req.id)">
                    🗑 Cancel Session
                  </button>
                  <button class="btn btn-teal btn-sm"
                    *ngIf="getSession(req.id)!.status === 'SCHEDULED'"
                    [disabled]="!canJoin(getSession(req.id)!) || completingRequestId() === req.id"
                    (click)="completeActiveSession(getSession(req.id)!.id, req.id)">
                    {{ completingRequestId() === req.id ? '...' : '✅ Complete' }}
                  </button>
                  <button class="btn btn-primary btn-sm"
                    *ngIf="getSession(req.id)!.status === 'SCHEDULED'"
                    [disabled]="!canJoin(getSession(req.id)!)"
                    (click)="openJitsi(getSession(req.id)!)">
                    Join
                  </button>
                </div>
              </ng-container>

              <ng-container *ngIf="editMode()">
                <div class="schedule-form">
                  <div class="form-group">
                    <label class="form-label">New Date & Time</label>
                    <input type="datetime-local" class="input"
                      [value]="scheduledAt"
                      (change)="scheduledAt = $any($event.target).value">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Room Name</label>
                    <input type="text" class="input"
                      placeholder="mentorship-..."
                      [value]="meetingLink"
                      (input)="meetingLink = $any($event.target).value">
                  </div>
                  <div class="schedule-actions">
                    <button class="btn btn-primary"
                      [disabled]="!scheduledAt || !meetingLink || schedulingSession()"
                      (click)="rescheduleSession(req.id)">
                      {{ schedulingSession() ? 'Saving...' : '💾 Save Changes' }}
                    </button>
                    <button class="btn btn-ghost" (click)="exitEditMode()">Cancel</button>
                  </div>
                </div>
              </ng-container>

            </div>

          </div>
        </div>
      </div>

      <!-- Schedule new session modal -->
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
            <label class="form-label">Room Name</label>
            <input type="text" class="input"
              placeholder="mentorship-..."
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

    </div>
  `,
    styleUrls: ['../mentorship-shared.scss']
})
export class MentorViewComponent implements OnInit {
    private mentorshipApi = inject(MentorshipApiService);
    private userApi = inject(UserApiService);

  calendarEvents = signal<EventInput[]>([]);
  calendarOptions = signal<CalendarOptions>({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    height: 'auto',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    },
    eventClick: (arg: EventClickArg) => {
      // No external navigation: sessions are joined in-app via Jitsi embed.
      arg.jsEvent.preventDefault();
    },
    events: [],
  });

    incomingRequests = signal<MentorRequest[]>([]);
    sessionMap = signal<Map<string, MentorSession>>(new Map());
    loadingRequests = signal(false);
    processingId = signal<string | null>(null);
    schedulingRequestId = signal<string | null>(null);
    schedulingSession = signal(false);
    completingRequestId = signal<string | null>(null);
    viewingId = signal<string | null>(null);
    editMode = signal(false);
    errorMessage = signal<string | null>(null);
    successMessage = signal<string | null>(null);
    isAvailable = signal(true);
    togglingAvailability = signal(false);
    currentUserId = signal<string | null>(null);
    displayName = signal<string>('');
    activeRoomName = signal<string | null>(null);
    scheduledAt = '';
    meetingLink = '';

    private generateRoomName(): string {
      try {
        const bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);
        const base64 = btoa(String.fromCharCode(...Array.from(bytes)));
        const base64url = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
        return `mentorship-${base64url}`;
      } catch {
        return `mentorship-${Date.now()}`;
      }
    }

    private ensureMeetingLinkPrefilled() {
      if (!this.meetingLink || !this.meetingLink.trim()) {
        this.meetingLink = this.generateRoomName();
      }
    }

    get pendingCount() {
        return () => this.incomingRequests().filter(r => r.status === 'PENDING').length;
    }

    ngOnInit() {
        this.loadCurrentUser();
        this.loadIncomingRequests();
    }

    loadCurrentUser() {
        this.userApi.getCurrentUser().subscribe({
            next: (user) => {
                this.currentUserId.set(user.id);
                this.isAvailable.set(user.status === 'ACTIVE');
          this.displayName.set(`${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.email || 'User');
            },
        error: () => this.showError('Failed to load profile.')
        });
    }

    canJoin(session: MentorSession): boolean {
      const start = new Date(session.scheduledAt).getTime();
      const now = Date.now();
        return now >= start;
    }

    openJitsi(session: MentorSession) {
      const room = (session.meetingLink || '').trim();
      if (!room) {
        this.showError('Room name not set.');
        return;
      }
      this.activeRoomName.set(room);
    }

    closeJitsi() {
      this.activeRoomName.set(null);
    }

    loadIncomingRequests() {
      const userId = this.currentUserId();
      if (!userId) {
        this.userApi.getCurrentUser().subscribe({
          next: (me) => {
            this.currentUserId.set(me.id);
            this.loadIncomingRequests();
          },
          error: () => this.showError('Failed to load profile.')
        });
        return;
      }

      this.loadingRequests.set(true);
      this.sessionMap.set(new Map());
      this.refreshCalendarEvents();

      this.mentorshipApi.getRequestsByMentor(userId).subscribe({
            next: (requests) => {
                this.incomingRequests.set(requests);
                this.loadingRequests.set(false);
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
                      this.refreshCalendarEvents();
                                }
                            }
                        });
                    });

            this.refreshCalendarEvents();
            },
            error: () => this.loadingRequests.set(false)
        });
    }

      private refreshCalendarEvents() {
        const sessions = Array.from(this.sessionMap().values());
        const events: EventInput[] = sessions
          .filter(s => s.status === 'SCHEDULED')
          .map(s => ({
            id: s.id,
            title: 'Mentorship Session',
            start: s.scheduledAt,
          }));

        this.calendarEvents.set(events);
        this.calendarOptions.update(opts => ({ ...opts, events }));
      }

    getSession(requestId: string): MentorSession | undefined {
        return this.sessionMap().get(requestId);
    }

    acceptRequest(requestId: string) {
        this.processingId.set(requestId);
        this.mentorshipApi.acceptRequest(requestId).subscribe({
            next: (updated) => {
                this.incomingRequests.update(reqs => reqs.map(r => r.id === requestId ? updated : r));
                this.processingId.set(null);
                this.showSuccess('Request accepted!');
            },
            error: () => { this.processingId.set(null); this.showError('Failed to accept.'); }
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
            error: () => { this.processingId.set(null); this.showError('Failed to decline.'); }
        });
    }

    deleteRequest(requestId: string) {
        this.processingId.set(requestId);
        this.mentorshipApi.deleteRequest(requestId).subscribe({
            next: () => {
                this.incomingRequests.update(reqs => reqs.filter(r => r.id !== requestId));
                this.sessionMap.update(map => { const m = new Map(map); m.delete(requestId); return m; });
                if (this.viewingId() === requestId) this.viewingId.set(null);
                this.processingId.set(null);
                this.showSuccess('Request deleted.');
            },
            error: () => { this.processingId.set(null); this.showError('Failed to delete.'); }
        });
    }

    toggleSession(requestId: string) {
        if (this.viewingId() === requestId) {
            this.viewingId.set(null);
            this.editMode.set(false);
        } else {
            this.viewingId.set(requestId);
            this.schedulingRequestId.set(null);
            this.editMode.set(false);
        }
    }

    openScheduleModal(requestId: string) {
        this.schedulingRequestId.set(requestId);
        this.viewingId.set(null);
        this.scheduledAt = '';
        this.meetingLink = '';
      this.ensureMeetingLinkPrefilled();
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
                this.sessionMap.update(map => { const m = new Map(map); m.set(requestId, session); return m; });
            this.refreshCalendarEvents();
                this.schedulingSession.set(false);
                this.closeScheduleModal();
                this.showSuccess('Session scheduled!');
            },
            error: (err) => {
                this.schedulingSession.set(false);
                this.showError(err.error?.error ?? 'Failed to schedule session.');
            }
        });
    }

    enterEditMode(requestId: string) {
        const session = this.getSession(requestId);
        if (!session) return;
        this.scheduledAt = session.scheduledAt.slice(0, 16);
        this.meetingLink = session.meetingLink;
      this.ensureMeetingLinkPrefilled();
        this.editMode.set(true);
    }

    exitEditMode() {
        this.editMode.set(false);
        this.scheduledAt = '';
        this.meetingLink = '';
    }

    rescheduleSession(requestId: string) {
        const session = this.getSession(requestId);
        if (!session || !this.scheduledAt || !this.meetingLink) return;
        this.schedulingSession.set(true);

        this.mentorshipApi.cancelSession(session.id).subscribe({
            next: () => {
                this.mentorshipApi.createSession({
                    requestId: session.requestId,
                    scheduledAt: this.scheduledAt,
                    meetingLink: this.meetingLink
                }).subscribe({
                    next: (newSession) => {
                        this.sessionMap.update(map => { const m = new Map(map); m.set(requestId, newSession); return m; });
                      this.refreshCalendarEvents();
                        this.schedulingSession.set(false);
                        this.editMode.set(false);
                        this.scheduledAt = '';
                        this.meetingLink = '';
                        this.showSuccess('Session updated!');
                    },
                    error: (err) => {
                        this.schedulingSession.set(false);
                        this.showError(err.error?.error ?? 'Failed to reschedule.');
                    }
                });
            },
            error: () => { this.schedulingSession.set(false); this.showError('Failed to cancel old session.'); }
        });
    }

    cancelActiveSession(sessionId: string, requestId: string) {
        this.mentorshipApi.cancelSession(sessionId).subscribe({
            next: () => {
                this.sessionMap.update(map => { const m = new Map(map); m.delete(requestId); return m; });
          this.refreshCalendarEvents();
                this.viewingId.set(null);
                this.showSuccess('Session cancelled.');
            },
            error: () => this.showError('Failed to cancel session.')
        });
    }

    completeActiveSession(sessionId: string, requestId: string) {
      this.completingRequestId.set(requestId);
      this.mentorshipApi.completeSession(sessionId).subscribe({
        next: (updated) => {
          this.sessionMap.update(map => {
            const m = new Map(map);
            m.set(requestId, updated);
            return m;
          });
          this.refreshCalendarEvents();

          if (this.activeRoomName() && (updated.meetingLink || '').trim() === this.activeRoomName()) {
            this.closeJitsi();
          }

          this.completingRequestId.set(null);
          this.showSuccess('Session completed.');
        },
        error: () => {
          this.completingRequestId.set(null);
          this.showError('Failed to complete session.');
        }
      });
    }

    toggleAvailability() {
        const userId = this.currentUserId();
        if (!userId) {
            this.showError('User ID not found.');
            return;
        }

        this.togglingAvailability.set(true);
        const newStatus = this.isAvailable() ? 'SUSPENDED' : 'ACTIVE';

        this.userApi.toggleAvailability(userId, newStatus).subscribe({
            next: (user) => {
                this.isAvailable.set(user.status === 'ACTIVE');
                this.togglingAvailability.set(false);
                this.showSuccess(this.isAvailable() ? 'You are now available for mentoring.' : 'You are now unavailable for mentoring.');
            },
          error: () => {
                this.togglingAvailability.set(false);
            this.showError('Failed to update availability.');
            }
        });
    }

    private showSuccess(msg: string) {
        this.successMessage.set(msg);
        setTimeout(() => this.successMessage.set(null), 3000);
    }

    private showError(msg: string) {
        this.errorMessage.set(msg);
        setTimeout(() => this.errorMessage.set(null), 4000);
    }
}