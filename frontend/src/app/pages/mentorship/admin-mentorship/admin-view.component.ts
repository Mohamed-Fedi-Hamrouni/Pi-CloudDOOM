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
								<th>Date</th>
								<th>Link</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							<tr *ngFor="let s of filteredSessions(); trackBy: trackById">
								<td class="mono">{{ s.id }}</td>
								<td class="mono">{{ s.requestId }}</td>
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
							</tr>
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

	loading = signal(false);
	errorMessage = signal<string | null>(null);

	requests = signal<MentorRequest[]>([]);
	sessions = signal<MentorSession[]>([]);

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
					this.requests.set(this.sortByDateDesc(requests, r => r.createdAt));
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

