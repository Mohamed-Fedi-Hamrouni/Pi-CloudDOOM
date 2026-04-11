import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, forkJoin, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { MentorshipApiService } from '../../../core/services/mentorship-api.service';
import { MentorRequest, MentorSession } from '../../../core/models/models';
import { UserApiService, UserProfile } from '../../../core/services/user-api.service';

type RequestStatus = MentorRequest['status'];
type SessionStatus = MentorSession['status'];

@Component({
	selector: 'app-admin-mentorship-view',
	standalone: true,
	imports: [CommonModule, SectionHeaderComponent],
	template: `
		<div class="mentorship-page animate-fade">

			<!-- Header -->
			<div class="page-header">
				<div>
					<h1>Mentorship</h1>
					<p>Admin dashboard to monitor mentorship requests and sessions.</p>
				</div>
				<div class="mentor-page-stats">
					<span class="chip chip-purple">🛡 Admin Dashboard</span>
				</div>
			</div>

			<!-- Messages -->
			<div class="card error-card" *ngIf="errorMessage()">⚠️ {{ errorMessage() }}</div>

			<!-- Loading -->
			<div class="card" *ngIf="loading()">Loading mentorship data...</div>

			<!-- Stats -->
			<div class="admin-mentorship-stats" *ngIf="!loading()">
				<div class="admin-stat-card">
					<div class="admin-stat-label">Total requests</div>
					<div class="admin-stat-value">{{ totalRequests() }}</div>
				</div>
				<div class="admin-stat-card">
					<div class="admin-stat-label">Pending requests</div>
					<div class="admin-stat-value">{{ requestCount('PENDING') }}</div>
				</div>
				<div class="admin-stat-card">
					<div class="admin-stat-label">Accepted requests</div>
					<div class="admin-stat-value">{{ requestCount('ACCEPTED') }}</div>
				</div>
				<div class="admin-stat-card">
					<div class="admin-stat-label">Declined requests</div>
					<div class="admin-stat-value">{{ requestCount('DECLINED') }}</div>
				</div>
				<div class="admin-stat-card">
					<div class="admin-stat-label">Total sessions</div>
					<div class="admin-stat-value">{{ totalSessions() }}</div>
					<div class="admin-stat-sub">
						<span class="chip chip-neutral">📅 {{ sessionCount('SCHEDULED') }} Scheduled</span>
						<span class="chip chip-teal">✅ {{ sessionCount('COMPLETED') }} Completed</span>
						<span class="chip chip-error">🛑 {{ sessionCount('CANCELLED') }} Cancelled</span>
					</div>
				</div>
			</div>

			<!-- Requests history table -->
			<div class="card" *ngIf="!loading()">
				<app-section-header title="Requests History" icon="📨"></app-section-header>

				<div class="admin-table-toolbar">
					<div class="admin-filter">
						<label class="form-label">Filter by status</label>
						<select class="input" [value]="requestStatusFilter()" (change)="setRequestFilter($event)">
							<option value="">All</option>
							<option value="PENDING">PENDING</option>
							<option value="ACCEPTED">ACCEPTED</option>
							<option value="DECLINED">DECLINED</option>
						</select>
					</div>
				</div>

				<div class="empty-state" *ngIf="filteredRequests().length === 0">
					<div class="empty-icon">📭</div>
					<div class="empty-title">No requests found</div>
					<div class="empty-desc">Try changing the status filter.</div>
				</div>

				<div class="table-wrap" *ngIf="filteredRequests().length > 0">
					<table class="admin-table">
						<thead>
							<tr>
								<th>Mentee</th>
								<th>Mentor</th>
								<th>Status</th>
								<th>Date</th>
									<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr *ngFor="let r of filteredRequests(); trackBy: trackById">
								<td [title]="r.menteeId">{{ userLabel(r.menteeId) }}</td>
								<td [title]="r.mentorId">{{ userLabel(r.mentorId) }}</td>
								<td>
									<span class="chip"
										[class.chip-neutral]="r.status === 'PENDING'"
										[class.chip-teal]="r.status === 'ACCEPTED'"
										[class.chip-error]="r.status === 'DECLINED'">
										{{ r.status }}
									</span>
								</td>
								<td>{{ r.createdAt | date:'medium' }}</td>
									<td>
										<div class="request-actions">
											<ng-container *ngIf="r.status === 'PENDING'">
												<button class="btn btn-primary btn-sm"
													[disabled]="processingRequestId() === r.id"
													(click)="acceptRequest(r.id)">
													{{ processingRequestId() === r.id ? '...' : '✓ Accept' }}
												</button>
												<button class="btn btn-ghost btn-sm"
													[disabled]="processingRequestId() === r.id"
													(click)="declineRequest(r.id)">
													✕ Reject
												</button>
												<button class="btn btn-ghost btn-sm"
													[disabled]="processingRequestId() === r.id"
													(click)="cancelRequest(r.id)">
													🗑 Cancel
												</button>
											</ng-container>

											<ng-container *ngIf="r.status !== 'PENDING'">
												<button class="btn btn-ghost btn-sm"
													[disabled]="processingRequestId() === r.id"
													(click)="deleteRequest(r.id)">
													🗑 Delete
												</button>
											</ng-container>
										</div>
									</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<!-- Sessions history table -->
			<div class="card" *ngIf="!loading()">
				<app-section-header title="Sessions History" icon="🎥"></app-section-header>

				<div class="admin-table-toolbar">
					<div class="admin-filter">
						<label class="form-label">Filter by status</label>
						<select class="input" [value]="sessionStatusFilter()" (change)="setSessionFilter($event)">
							<option value="">All</option>
							<option value="SCHEDULED">SCHEDULED</option>
							<option value="COMPLETED">COMPLETED</option>
							<option value="CANCELLED">CANCELLED</option>
						</select>
					</div>
				</div>

				<div class="empty-state" *ngIf="filteredSessions().length === 0">
					<div class="empty-icon">🎬</div>
					<div class="empty-title">No sessions found</div>
					<div class="empty-desc">Try changing the status filter.</div>
				</div>

				<div class="table-wrap" *ngIf="filteredSessions().length > 0">
					<table class="admin-table">
						<thead>
							<tr>
								<th>Session ID</th>
								<th>Request ID</th>
								<th>Mentee</th>
								<th>Mentor</th>
								<th>Date</th>
								<th>Link</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<ng-container *ngFor="let s of filteredSessions(); trackBy: trackById">
								<tr *ngIf="editingSessionId() !== s.id">
									<td class="mono">{{ s.id }}</td>
									<td class="mono">{{ s.requestId }}</td>
									<td [title]="sessionMenteeId(s)">{{ sessionMenteeLabel(s) }}</td>
									<td [title]="sessionMentorId(s)">{{ sessionMentorLabel(s) }}</td>
									<td>{{ s.scheduledAt | date:'medium' }}</td>
									<td class="mono">{{ s.meetingLink }}</td>
									<td>
										<span class="chip"
											[class.chip-neutral]="s.status === 'SCHEDULED'"
											[class.chip-teal]="s.status === 'COMPLETED'"
											[class.chip-error]="s.status === 'CANCELLED'">
											{{ s.status }}
										</span>
									</td>
									<td>
										<div class="request-actions">
											<button class="btn btn-ghost btn-sm" (click)="openMeetingLink(s)">🔗 Open</button>
											<button class="btn btn-primary btn-sm"
												*ngIf="s.status === 'SCHEDULED'"
												(click)="startEditSession(s)">✏️ Edit</button>
											<button class="btn btn-ghost btn-sm"
												*ngIf="s.status === 'SCHEDULED'"
												[disabled]="processingSessionId() === s.id"
												(click)="cancelSession(s.id)">🗑 Cancel</button>
											<button class="btn btn-teal btn-sm"
												*ngIf="s.status === 'SCHEDULED'"
												[disabled]="processingSessionId() === s.id"
												(click)="completeSession(s.id)">✅ Complete</button>
											<button class="btn btn-ghost btn-sm"
												[disabled]="processingSessionId() === s.id"
												(click)="deleteSession(s.id)">🗑 Delete</button>
										</div>
									</td>
								</tr>
								<tr *ngIf="editingSessionId() === s.id">
									<td class="mono">{{ s.id }}</td>
									<td class="mono">{{ s.requestId }}</td>
									<td [title]="sessionMenteeId(s)">{{ sessionMenteeLabel(s) }}</td>
									<td [title]="sessionMentorId(s)">{{ sessionMentorLabel(s) }}</td>
									<td>
										<input class="input" type="datetime-local" [value]="editScheduledAt()" (change)="editScheduledAt.set($any($event.target).value)" />
									</td>
									<td>
										<input class="input" type="text" [value]="editMeetingLink()" (input)="editMeetingLink.set($any($event.target).value)" />
									</td>
									<td>
										<span class="chip chip-neutral">SCHEDULED</span>
									</td>
									<td>
										<div class="request-actions">
											<button class="btn btn-primary btn-sm" [disabled]="processingSessionId() === s.id" (click)="saveEditSession(s.id)">💾 Save</button>
											<button class="btn btn-ghost btn-sm" (click)="cancelEditSession()">Cancel</button>
										</div>
									</td>
								</tr>
							</ng-container>
						</tbody>
					</table>
				</div>
			</div>

		</div>
	`,
	styleUrls: ['../mentorship-shared.scss']
})
export class AdminViewComponent implements OnInit {
	private mentorshipApi = inject(MentorshipApiService);
	private userApi = inject(UserApiService);

	private userNameById = signal<Record<string, string>>({});
	private requestById = signal<Map<string, MentorRequest>>(new Map());

	loading = signal(false);
	errorMessage = signal<string | null>(null);

	requests = signal<MentorRequest[]>([]);
	sessions = signal<MentorSession[]>([]);
	processingRequestId = signal<string | null>(null);
	processingSessionId = signal<string | null>(null);
	editingSessionId = signal<string | null>(null);
	editScheduledAt = signal<string>('');
	editMeetingLink = signal<string>('');

	requestStatusFilter = signal<'' | RequestStatus>('');
	sessionStatusFilter = signal<'' | SessionStatus>('');

	ngOnInit(): void {
		this.load();
	}

	private load(): void {
		this.loading.set(true);
		this.errorMessage.set(null);

		forkJoin({
			requests: this.mentorshipApi.getAllRequests(),
			sessions: this.mentorshipApi.getAllSessions()
		})
			.pipe(finalize(() => this.loading.set(false)))
			.subscribe({
				next: ({ requests, sessions }) => {
					const sortedRequests = this.sortByDateDesc(requests, r => r.createdAt);
					this.requests.set(sortedRequests);
					this.requestById.set(new Map(sortedRequests.map(r => [r.id, r])));
					this.sessions.set(this.sortByDateDesc(sessions, s => s.scheduledAt));
					this.prefetchUserNames([
						...requests.map(r => r.menteeId),
						...requests.map(r => r.mentorId)
					]);
				},
				error: (err) => {
					const message = err?.error?.message || err?.message || 'Failed to load mentorship admin data.';
					this.errorMessage.set(message);
				}
			});
	}

	private requestForSession(session: MentorSession): MentorRequest | undefined {
		return this.requestById().get(session.requestId);
	}

	acceptRequest(requestId: string): void {
		this.processingRequestId.set(requestId);
		this.mentorshipApi.acceptRequest(requestId).subscribe({
			next: (updated) => {
				this.requests.update(list => list.map(r => (r.id === requestId ? updated : r)));
				this.requestById.update(map => {
					const next = new Map(map);
					next.set(requestId, updated);
					return next;
				});
				this.processingRequestId.set(null);
			},
			error: () => this.processingRequestId.set(null)
		});
	}

	declineRequest(requestId: string): void {
		this.processingRequestId.set(requestId);
		this.mentorshipApi.declineRequest(requestId).subscribe({
			next: (updated) => {
				this.requests.update(list => list.map(r => (r.id === requestId ? updated : r)));
				this.requestById.update(map => {
					const next = new Map(map);
					next.set(requestId, updated);
					return next;
				});
				this.processingRequestId.set(null);
			},
			error: () => this.processingRequestId.set(null)
		});
	}

	deleteRequest(requestId: string): void {
		const ok = window.confirm('Are you sure? This will delete the request and all its sessions.');
		if (!ok) return;
		this.processingRequestId.set(requestId);
		this.mentorshipApi.deleteRequest(requestId).subscribe({
			next: () => {
				this.requests.update(list => list.filter(r => r.id !== requestId));
				this.requestById.update(map => {
					const next = new Map(map);
					next.delete(requestId);
					return next;
				});
				// also remove sessions that belonged to that request (keeps UI consistent)
				this.sessions.update(list => list.filter(s => s.requestId !== requestId));
				this.processingRequestId.set(null);
			},
			error: () => this.processingRequestId.set(null)
		});
	}

	cancelRequest(requestId: string): void {
		// "Cancel" is implemented as delete (requests have no CANCELLED status)
		this.deleteRequest(requestId);
	}

	openMeetingLink(session: MentorSession): void {
		const raw = (session.meetingLink || '').trim();
		if (!raw) return;
		const url = /^https?:\/\//i.test(raw) ? raw : `https://meet.jit.si/${encodeURIComponent(raw)}`;
		window.open(url, '_blank', 'noopener');
	}

	deleteSession(sessionId: string): void {
		const ok = window.confirm('Are you sure you want to delete this session?');
		if (!ok) return;
		this.processingSessionId.set(sessionId);
		this.mentorshipApi.deleteSession(sessionId).subscribe({
			next: () => {
				this.sessions.update(list => list.filter(s => s.id !== sessionId));
				if (this.editingSessionId() === sessionId) {
					this.cancelEditSession();
				}
				this.processingSessionId.set(null);
			},
			error: () => this.processingSessionId.set(null)
		});
	}

	startEditSession(session: MentorSession): void {
		this.editingSessionId.set(session.id);
		// datetime-local expects YYYY-MM-DDTHH:mm
		const iso = (session.scheduledAt || '').slice(0, 16);
		this.editScheduledAt.set(iso);
		this.editMeetingLink.set(session.meetingLink || '');
	}

	cancelEditSession(): void {
		this.editingSessionId.set(null);
		this.editScheduledAt.set('');
		this.editMeetingLink.set('');
	}

	saveEditSession(sessionId: string): void {
		this.processingSessionId.set(sessionId);
		this.mentorshipApi.updateSession(sessionId, this.editScheduledAt(), this.editMeetingLink()).subscribe({
			next: (updated) => {
				this.sessions.update(list => list.map(s => (s.id === sessionId ? updated : s)));
				this.processingSessionId.set(null);
				this.cancelEditSession();
			},
			error: () => this.processingSessionId.set(null)
		});
	}

	cancelSession(sessionId: string): void {
		this.processingSessionId.set(sessionId);
		this.mentorshipApi.cancelSession(sessionId).subscribe({
			next: (updated) => {
				this.sessions.update(list => list.map(s => (s.id === sessionId ? updated : s)));
				this.processingSessionId.set(null);
			},
			error: () => this.processingSessionId.set(null)
		});
	}

	completeSession(sessionId: string): void {
		this.processingSessionId.set(sessionId);
		this.mentorshipApi.completeSession(sessionId).subscribe({
			next: (updated) => {
				this.sessions.update(list => list.map(s => (s.id === sessionId ? updated : s)));
				this.processingSessionId.set(null);
			},
			error: () => this.processingSessionId.set(null)
		});
	}

	sessionMenteeId(session: MentorSession): string {
		return this.requestForSession(session)?.menteeId ?? '';
	}

	sessionMentorId(session: MentorSession): string {
		return this.requestForSession(session)?.mentorId ?? '';
	}

	sessionMenteeLabel(session: MentorSession): string {
		const id = this.sessionMenteeId(session);
		return id ? this.userLabel(id) : '—';
	}

	sessionMentorLabel(session: MentorSession): string {
		const id = this.sessionMentorId(session);
		return id ? this.userLabel(id) : '—';
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

	totalRequests(): number {
		return this.requests().length;
	}

	requestCount(status: RequestStatus): number {
		return this.requests().filter(r => r.status === status).length;
	}

	totalSessions(): number {
		return this.sessions().length;
	}

	sessionCount(status: SessionStatus): number {
		return this.sessions().filter(s => s.status === status).length;
	}

	filteredRequests(): MentorRequest[] {
		const status = this.requestStatusFilter();
		const rows = this.requests();
		if (!status) return rows;
		return rows.filter(r => r.status === status);
	}

	filteredSessions(): MentorSession[] {
		const status = this.sessionStatusFilter();
		const rows = this.sessions();
		if (!status) return rows;
		return rows.filter(s => s.status === status);
	}

	setRequestFilter(event: Event): void {
		const next = String((event.target as HTMLSelectElement).value || '') as '' | RequestStatus;
		this.requestStatusFilter.set(next);
	}

	setSessionFilter(event: Event): void {
		const next = String((event.target as HTMLSelectElement).value || '') as '' | SessionStatus;
		this.sessionStatusFilter.set(next);
	}

	trackById(_index: number, row: { id: string }): string {
		return row.id;
	}

	private sortByDateDesc<T>(items: T[], getDate: (item: T) => string): T[] {
		return [...items].sort((a, b) => {
			const aTime = Date.parse(getDate(a) || '');
			const bTime = Date.parse(getDate(b) || '');
			return (isNaN(bTime) ? 0 : bTime) - (isNaN(aTime) ? 0 : aTime);
		});
	}
}

