import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { MentorCardComponent } from '../../../shared/components/mentor-card/mentor-card.component';
import { JitsiMeetComponent } from '../../../shared/components/jitsi-meet/jitsi-meet.component';
import { MentorshipApiService } from '../../../core/services/mentorship-api.service';
import { UserApiService, UserProfile } from '../../../core/services/user-api.service';
import { MentorRequest, MentorSession, Mentor } from '../../../core/models/models';
import { Observable, catchError, forkJoin, of } from 'rxjs';

@Component({
    selector: 'app-mentee-view',
    standalone: true,
    imports: [CommonModule, SectionHeaderComponent, MentorCardComponent, FullCalendarModule, JitsiMeetComponent],
    template: `
    <div class="mentorship-page animate-fade">

      <!-- Header -->
      <div class="page-header">
        <div>
          <h1>Mentorship</h1>
          <p>Book 1:1 sessions with verified industry professionals. Get the insider guidance you need.</p>
        </div>
        <div class="mentor-page-stats">
          <span class="chip chip-teal">🤝 {{ mentors.length }}+ Mentors</span>
          <span class="chip chip-mint">⭐ 4.8 Avg Rating</span>
        </div>
      </div>

      <!-- Messages -->
      <div class="card error-card" *ngIf="errorMessage()">⚠️ {{ errorMessage() }}</div>
      <div class="card success-card" *ngIf="successMessage()">✅ {{ successMessage() }}</div>

      <!-- Upcoming SCHEDULED session banner -->
      <div class="card upcoming-session" *ngIf="upcomingSession() && upcomingSession()!.status === 'SCHEDULED'">
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
            <button class="btn btn-primary"
              [disabled]="!canJoin(upcomingSession()!)"
              (click)="openJitsi(upcomingSession()!)">
              Join
            </button>
            <button class="btn btn-ghost btn-sm"
              (click)="cancelSession(upcomingSession()!.id)">
              Cancel
            </button>
          </div>
        </div>
      </div>

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

      <!-- My requests + sessions -->
      <div class="card" *ngIf="myRequests().length > 0">
        <app-section-header title="My Mentor Requests" icon="📨"></app-section-header>
        <div class="requests-list">

          <div class="request-block" *ngFor="let req of myRequests()">

            <!-- Request row -->
            <div class="request-item">
              <div class="request-info">
                <span class="request-mentor" [title]="req.mentorId">Mentor: {{ userLabel(req.mentorId) }}</span>
                <span class="chip"
                  [class.chip-teal]="req.status === 'ACCEPTED'"
                  [class.chip-neutral]="req.status === 'PENDING'"
                  [class.chip-error]="req.status === 'DECLINED'">
                  {{ req.status }}
                </span>
              </div>
              <div class="request-date">{{ req.createdAt | date:'mediumDate' }}</div>
              <div class="request-actions">
                <button class="btn btn-ghost btn-sm"
                  *ngIf="req.status === 'PENDING'"
                  (click)="cancelRequest(req.id)">
                  Cancel Request
                </button>
                <button class="btn btn-ghost btn-sm"
                  *ngIf="req.status === 'ACCEPTED' && getSessionsForRequest(req.id).length > 0"
                  (click)="toggleSessions(req.id)">
                  {{ expandedRequestId() === req.id ? '▲ Hide Sessions' : '📋 View Sessions' }}
                </button>
              </div>
            </div>

            <!-- Sessions for this request -->
            <div class="sessions-list"
              *ngIf="expandedRequestId() === req.id && getSessionsForRequest(req.id).length > 0">
              <div class="session-card" *ngFor="let session of getSessionsForRequest(req.id)">
                <div class="session-row">
                  <span class="session-label">📅 Date</span>
                  <span class="session-value">{{ session.scheduledAt | date:'full' }}</span>
                </div>
                <div class="session-row">
                  <span class="session-label">🎥 Room Name</span>
                  <span class="session-value">{{ session.meetingLink }}</span>
                </div>
                <div class="session-row">
                  <span class="session-label">📊 Status</span>
                  <span class="chip"
                    [class.chip-teal]="session.status === 'SCHEDULED'"
                    [class.chip-neutral]="session.status === 'COMPLETED'"
                    [class.chip-error]="session.status === 'CANCELLED'">
                    {{ session.status }}
                  </span>
                </div>
                <div class="session-row-actions">
                  <button class="btn btn-primary btn-sm"
                    *ngIf="session.status === 'SCHEDULED'"
                    [disabled]="!canJoin(session)"
                    (click)="openJitsi(session)">
                    Join
                  </button>
                  <button class="btn btn-ghost btn-sm"
                    *ngIf="session.status === 'SCHEDULED'"
                    (click)="cancelSession(session.id)">
                    Cancel Session
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Filters + Search -->
      <div class="mentors-controls">
        <div class="input-icon-wrap" style="flex:1;max-width:380px;">
          <span class="icon">🔍</span>
          <input class="input"
            placeholder="Search by name, expertise, company..."
            [value]="searchQuery()"
            (input)="searchQuery.set($any($event.target).value)">
        </div>
        <div class="mentor-filters">
          <button class="chip"
            [class]="activeFilter() === 'all' ? 'chip-teal' : 'chip-neutral'"
            (click)="setFilter('all')">All Mentors</button>
          <button class="chip"
            [class]="activeFilter() === 'available' ? 'chip-teal' : 'chip-neutral'"
            (click)="setFilter('available')">Available Now</button>
        </div>
        <select class="input" style="width:auto;padding:0.5rem 1rem;"
          (change)="setSortBy($any($event.target).value)">
          <option value="rating">Sort: Top Rated</option>
          <option value="sessions">Sort: Most Sessions</option>
          <option value="price_asc">Sort: Price Low→High</option>
          <option value="price_desc">Sort: Price High→Low</option>
        </select>
      </div>

      <!-- Mentor grid -->
      <div class="mentors-grid">
        <app-mentor-card
          *ngFor="let mentor of displayedMentors()"
          [mentor]="mentor"
          [requested]="hasRequestFor(mentor.id)"
          [requesting]="requestingId() === mentor.id"
          (requestClicked)="sendRequest($event)">
        </app-mentor-card>
      </div>

      <!-- Empty search result -->
      <div class="empty-state" *ngIf="displayedMentors().length === 0">
        <div class="empty-icon">🔍</div>
        <div class="empty-title">No mentors found</div>
        <div class="empty-desc">Try a different search or filter.</div>
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

    </div>
  `,
    styleUrls: ['../mentorship-shared.scss']
})
export class MenteeViewComponent implements OnInit {
    private mentorshipApi = inject(MentorshipApiService);
  private userApi = inject(UserApiService);

  private userNameById = signal<Record<string, string>>({});

  displayName = signal<string>('');
  activeRoomName = signal<string | null>(null);

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

    mentors: Mentor[] = [];
    myRequests = signal<MentorRequest[]>([]);
    sessionsByRequest = signal<Map<string, MentorSession[]>>(new Map());
    upcomingSession = signal<MentorSession | null>(null);
    requestingId = signal<string | null>(null);
    expandedRequestId = signal<string | null>(null);
    errorMessage = signal<string | null>(null);
    successMessage = signal<string | null>(null);
    activeFilter = signal<'all' | 'available'>('all');
    searchQuery = signal('');
    sortBy = signal('rating');

    displayedMentors = () => {
        let list = [...this.mentors];

        // search
        const q = this.searchQuery().toLowerCase().trim();
        if (q) {
            list = list.filter(m =>
                m.name.toLowerCase().includes(q) ||
                m.company.toLowerCase().includes(q) ||
                m.expertise.some(e => e.toLowerCase().includes(q)) ||
                m.title.toLowerCase().includes(q)
            );
        }

        // filter
        if (this.activeFilter() === 'available') list = list.filter(m => m.available);

        // sort
        if (this.sortBy() === 'rating') list.sort((a, b) => b.rating - a.rating);
        if (this.sortBy() === 'sessions') list.sort((a, b) => b.sessions - a.sessions);
        if (this.sortBy() === 'price_asc') list.sort((a, b) => a.price - b.price);
        if (this.sortBy() === 'price_desc') list.sort((a, b) => b.price - a.price);

        return list;
    };

    ngOnInit() {
      this.loadMentors();
      this.loadMyRequests();
    }

    loadMentors() {
      this.mentorshipApi.getMentors().subscribe({
        next: (res) => {
          this.mentors = (res.content || []).map((user: any) => {
            const initials = (user.firstName?.[0] || '') + (user.lastName?.[0] || '');
            return {
              id: user.id,
              name: user.firstName + ' ' + user.lastName,
              initials,
              avatar: user.avatarUrl || '',
              title: user.status || '', // You can adjust this if you want a different field
              company: user.city || '',
              expertise: user.skills || [],
              rating: user.karmaPoints || 5, // Placeholder, adjust if you have a real rating
              reviews: user.isVerified ? 1 : 0, // Placeholder, adjust as needed
              sessions: 0, // Not available in UserResponse
              available: user.status === 'ACTIVE',
              price: 0, // Not available in UserResponse
              bio: user.bio || '',
              nextAvailable: '', // Not available in UserResponse
              email: user.email,
              experiencesJson: user.experiencesJson,
              isVerified: user.isVerified
            };
          });
        },
        error: () => {
          this.mentors = [];
          this.showError('Failed to load mentors.');
        }
      });
    }

    loadMyRequests() {
      this.userApi.getCurrentUser().subscribe({
        next: (me) => {
          this.displayName.set(`${me.firstName ?? ''} ${me.lastName ?? ''}`.trim() || me.email || 'User');
          this.sessionsByRequest.set(new Map());
          this.upcomingSession.set(null);
          this.refreshCalendarEvents();
          this.mentorshipApi.getRequestsByMentee(me.id).subscribe({
            next: (requests) => {
                this.myRequests.set(requests);
                this.prefetchUserNames(requests.map(r => r.mentorId));
                // load sessions for each accepted request
                requests
                    .filter(r => r.status === 'ACCEPTED')
                    .forEach(r => {
                        this.mentorshipApi.getSessionsByRequest(r.id).subscribe({
                            next: (sessions) => {
                                this.sessionsByRequest.update(map => {
                                    const newMap = new Map(map);
                                    newMap.set(r.id, sessions);
                                    return newMap;
                                });
                                // set upcoming session banner
                                const scheduled = sessions.find(s => s.status === 'SCHEDULED');
                                if (scheduled) this.upcomingSession.set(scheduled);

                                this.refreshCalendarEvents();
                            }
                        });
                    });

                this.refreshCalendarEvents();
            },
            error: () => {}
          });
        },
        error: () => {}
      });
    }

        userLabel(userId: string): string {
          if (!userId) return '';
          return this.userNameById()[userId] || userId;
        }

        private prefetchUserNames(userIds: string[]): void {
          const existing = this.userNameById();
          const unique = Array.from(new Set((userIds || []).filter(Boolean)));
          const missing = unique.filter(id => !existing[id]);
          if (missing.length === 0) return;

          const calls: Record<string, Observable<UserProfile | null>> = {};
          for (const id of missing) {
            calls[id] = this.userApi.getUserById(id).pipe(catchError(() => of(null)));
          }

          forkJoin(calls).subscribe((result) => {
            const additions: Record<string, string> = {};
            for (const [id, profile] of Object.entries(result)) {
              if (!profile) continue;
              const fullName = `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim();
              additions[id] = fullName || profile.email || id;
            }

            if (Object.keys(additions).length === 0) return;
            this.userNameById.update((curr) => ({ ...curr, ...additions }));
          });
        }

    private refreshCalendarEvents() {
        const sessions: MentorSession[] = [];
        for (const list of this.sessionsByRequest().values()) {
            sessions.push(...list);
        }

        const scheduled = sessions.filter(s => s.status === 'SCHEDULED');
        const events: EventInput[] = scheduled.map(s => ({
            id: s.id,
            title: 'Mentorship Session',
            start: s.scheduledAt,
            // No external navigation: sessions are joined in-app via Jitsi embed.
        }));

        this.calendarEvents.set(events);
        this.calendarOptions.update(opts => ({ ...opts, events }));
    }

    getSessionsForRequest(requestId: string): MentorSession[] {
        return this.sessionsByRequest().get(requestId) ?? [];
    }

    toggleSessions(requestId: string) {
        this.expandedRequestId.set(
            this.expandedRequestId() === requestId ? null : requestId
        );
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
                // update session status in the map
                this.sessionsByRequest.update(map => {
                    const newMap = new Map(map);
                    newMap.forEach((sessions, key) => {
                        newMap.set(key, sessions.map(s =>
                            s.id === sessionId ? { ...s, status: 'CANCELLED' as const } : s
                        ));
                    });
                    return newMap;
                });
          this.refreshCalendarEvents();
                this.showSuccess('Session cancelled.');
            },
            error: () => this.showError('Failed to cancel session.')
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

    hasRequestFor(mentorId: string): boolean {
        return this.myRequests().some(r => r.mentorId === mentorId && r.status === 'PENDING');
    }

    setFilter(f: 'all' | 'available') { this.activeFilter.set(f); }
    setSortBy(s: string) { this.sortBy.set(s); }

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
      { icon: '🔍', title: 'Browse Mentors', desc: 'Browse all mentors or only available mentors.' },
        { icon: '📅', title: 'Book a Session', desc: 'Choose a time slot that works for you and your mentor.' },
        { icon: '🎙️', title: 'Meet & Practice', desc: 'Join a live 1:1 video session with your mentor.' },
        { icon: '📊', title: 'Get Feedback', desc: 'Receive personalized feedback and an action plan.' },
    ];
}