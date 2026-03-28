import {
    Component,
    inject,
    OnInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../core/auth/auth.service";
import { environment } from "../../../environments/environment";
import { InterviewApiService } from "../../core/services/interview-api.service";
import {
    InterviewSessionResponse,
    PerformanceReport,
    ProgressTracker,
} from "../../core/models/interview.models";

interface UserItem {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
    plan: string;
    isVerified: boolean;
    karmaPoints: number;
    createdAt: string;
    phoneNumber: string;
    city: string;
    bio: string;
    preferredIndustry: string;
    preferredLanguage: string;
    simulationsUsedThisMonth: number;
    simulationsLimit: number;
    subscriptionActive: boolean;
    lastLoginAt: string;
}

type AdminTab = "users" | "interviews";

@Component({
    selector: "app-admin-dashboard",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="admin-panel">
            <!-- Tab switcher -->
            <div class="admin-tabs">
                <button
                    class="adm-tab"
                    [class.active]="activeTab === 'users'"
                    (click)="activeTab = 'users'"
                >
                    👥 Users
                </button>
                <button
                    class="adm-tab"
                    [class.active]="activeTab === 'interviews'"
                    (click)="activeTab = 'interviews'"
                >
                    🎙️ Interviews
                </button>
            </div>

            <!-- ════════════════════ USERS TAB ════════════════════ -->
            <ng-container *ngIf="activeTab === 'users'">
                <div class="admin-stats">
                    <div class="stat-box">
                        <div class="stat-value">{{ stats.total }}</div>
                        <div class="stat-label">Total Users</div>
                    </div>
                    <div class="stat-box stat-box-green">
                        <div class="stat-value">{{ stats.active }}</div>
                        <div class="stat-label">Active</div>
                    </div>
                    <div class="stat-box stat-box-yellow">
                        <div class="stat-value">{{ stats.pending }}</div>
                        <div class="stat-label">Pending Verification</div>
                    </div>
                    <div class="stat-box stat-box-red">
                        <div class="stat-value">{{ stats.suspended }}</div>
                        <div class="stat-label">Suspended</div>
                    </div>
                </div>

                <div class="admin-toolbar">
                    <div class="search-wrap">
                        <span class="search-icon">🔍</span>
                        <input
                            class="input search-input"
                            type="search"
                            placeholder="Search by name or email..."
                            [(ngModel)]="searchQuery"
                            (input)="onSearch()"
                        />
                    </div>
                    <div class="filter-wrap">
                        <select
                            class="input filter-select"
                            [(ngModel)]="statusFilter"
                            (change)="loadUsers()"
                        >
                            <option value="">All statuses</option>
                            <option value="ACTIVE">Active</option>
                            <option value="PENDING_VERIFICATION">
                                Pending
                            </option>
                            <option value="SUSPENDED">Suspended</option>
                            <option value="DELETED">Deleted</option>
                        </select>
                        <select
                            class="input filter-select"
                            [(ngModel)]="roleFilter"
                            (change)="loadUsers()"
                        >
                            <option value="">All roles</option>
                            <option value="USER">User</option>
                            <option value="STUDENT">Student</option>
                            <option value="MENTOR">Mentor</option>
                            <option value="MANAGER">Manager</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                </div>

                <div class="admin-table-wrap">
                    <div *ngIf="loading" class="table-loading">
                        Loading users...
                    </div>
                    <table *ngIf="!loading" class="admin-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Status</th>
                                <th>Role</th>
                                <th>Plan</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                *ngFor="let user of users"
                                class="user-row"
                                (click)="openDetail(user)"
                            >
                                <td>
                                    <div class="user-cell">
                                        <div class="user-avatar">
                                            {{ getInitials(user) }}
                                        </div>
                                        <div class="user-info">
                                            <div class="user-name">
                                                {{ user.firstName }}
                                                {{ user.lastName }}
                                            </div>
                                            <div class="user-email">
                                                {{ user.email }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span
                                        class="badge"
                                        [ngClass]="getStatusClass(user.status)"
                                    >
                                        {{ formatStatus(user.status) }}
                                    </span>
                                </td>
                                <td>
                                    <span class="badge badge-role">{{
                                        user.role
                                    }}</span>
                                </td>
                                <td>
                                    <span class="badge badge-plan">{{
                                        user.plan
                                    }}</span>
                                </td>
                                <td class="date-cell">
                                    {{ user.createdAt | date: "MMM d, y" }}
                                </td>
                                <td (click)="$event.stopPropagation()">
                                    <div class="action-buttons">
                                        <button
                                            *ngIf="!user.isVerified"
                                            class="action-btn action-btn-green"
                                            (click)="verifyUser(user)"
                                        >
                                            ✓ Verify
                                        </button>
                                        <select
                                            class="action-select"
                                            [value]="user.role"
                                            (change)="changeRole(user, $event)"
                                        >
                                            <option value="USER">USER</option>
                                            <option value="STUDENT">
                                                STUDENT
                                            </option>
                                            <option value="MENTOR">
                                                MENTOR
                                            </option>
                                            <option value="MANAGER">
                                                MANAGER
                                            </option>
                                            <option value="ADMIN">ADMIN</option>
                                        </select>
                                        <button
                                            *ngIf="user.status === 'ACTIVE'"
                                            class="action-btn action-btn-orange"
                                            (click)="
                                                updateStatus(user, 'SUSPENDED')
                                            "
                                        >
                                            Suspend
                                        </button>
                                        <button
                                            *ngIf="user.status === 'SUSPENDED'"
                                            class="action-btn action-btn-green"
                                            (click)="
                                                updateStatus(user, 'ACTIVE')
                                            "
                                        >
                                            Activate
                                        </button>
                                        <button
                                            class="action-btn action-btn-red"
                                            (click)="deleteUser(user)"
                                        >
                                            🗑
                                        </button>
                                        <button
                                            *ngIf="user.status === 'DELETED'"
                                            class="action-btn action-btn-green"
                                            (click)="restoreUser(user)"
                                        >
                                            ↩ Restore
                                        </button>
                                        <button
                                            class="action-btn action-btn-teal"
                                            title="View interview sessions"
                                            (click)="
                                                viewUserInterviews(user);
                                                $event.stopPropagation()
                                            "
                                        >
                                            🎙️ Sessions
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div
                        *ngIf="!loading && users.length === 0"
                        class="table-empty"
                    >
                        No users found.
                    </div>
                </div>

                <div class="admin-pagination" *ngIf="totalPages > 1">
                    <button
                        class="page-btn"
                        [disabled]="currentPage === 0"
                        (click)="goToPage(currentPage - 1)"
                    >
                        ← Prev
                    </button>
                    <span class="page-info"
                        >Page {{ currentPage + 1 }} of {{ totalPages }}</span
                    >
                    <button
                        class="page-btn"
                        [disabled]="currentPage >= totalPages - 1"
                        (click)="goToPage(currentPage + 1)"
                    >
                        Next →
                    </button>
                </div>
            </ng-container>

            <!-- ════════════════════ INTERVIEWS TAB ════════════════════ -->
            <ng-container *ngIf="activeTab === 'interviews'">
                <!-- No user selected: show user picker -->
                <div *ngIf="!selectedInterviewUser" class="user-picker-state">
                    <div class="picker-hint">
                        <div class="picker-hint-icon">🎙️</div>
                        <h3>Select a user to inspect their sessions</h3>
                        <p>
                            Search and pick any user to view their interview
                            history and progress tracker.
                        </p>
                    </div>
                    <div class="admin-toolbar">
                        <div class="search-wrap">
                            <span class="search-icon">🔍</span>
                            <input
                                class="input search-input"
                                type="search"
                                placeholder="Search users by name or email..."
                                [(ngModel)]="intUserSearch"
                                (input)="onIntUserSearch()"
                            />
                        </div>
                    </div>
                    <div class="admin-table-wrap">
                        <div *ngIf="loading" class="table-loading">
                            Loading users...
                        </div>
                        <table *ngIf="!loading" class="admin-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    *ngFor="let user of intUserList"
                                    class="user-row"
                                    (click)="viewUserInterviews(user)"
                                >
                                    <td>
                                        <div class="user-cell">
                                            <div class="user-avatar">
                                                {{ getInitials(user) }}
                                            </div>
                                            <div class="user-info">
                                                <div class="user-name">
                                                    {{ user.firstName }}
                                                    {{ user.lastName }}
                                                </div>
                                                <div class="user-email">
                                                    {{ user.email }}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="badge badge-role">{{
                                            user.role
                                        }}</span>
                                    </td>
                                    <td>
                                        <span
                                            class="badge"
                                            [ngClass]="
                                                getStatusClass(user.status)
                                            "
                                            >{{
                                                formatStatus(user.status)
                                            }}</span
                                        >
                                    </td>
                                    <td>
                                        <button
                                            class="action-btn action-btn-teal"
                                            (click)="
                                                viewUserInterviews(user);
                                                $event.stopPropagation()
                                            "
                                        >
                                            🎙️ View Sessions
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div
                            *ngIf="!loading && intUserList.length === 0"
                            class="table-empty"
                        >
                            No users found.
                        </div>
                    </div>
                </div>

                <!-- User selected: sessions + progress view -->
                <ng-container *ngIf="selectedInterviewUser">
                    <!-- Header bar -->
                    <div class="int-header">
                        <button class="btn-back" (click)="clearInterviewUser()">
                            ← Back to Users
                        </button>
                        <div class="int-user-pill">
                            <div class="user-avatar">
                                {{ getInitials(selectedInterviewUser) }}
                            </div>
                            <div>
                                <div class="user-name">
                                    {{ selectedInterviewUser.firstName }}
                                    {{ selectedInterviewUser.lastName }}
                                </div>
                                <div class="user-email">
                                    {{ selectedInterviewUser.email }}
                                </div>
                            </div>
                        </div>
                        <div class="int-header-right">
                            <button
                                class="action-btn action-btn-teal"
                                (click)="toggleProgress()"
                            >
                                {{
                                    showUserProgress
                                        ? "▲ Hide Progress"
                                        : "📈 View Progress"
                                }}
                            </button>
                            <div
                                class="int-session-count"
                                *ngIf="!intSessionsLoading"
                            >
                                <span class="count-num">{{
                                    intSessions.length
                                }}</span>
                                <span class="count-label"
                                    >session{{
                                        intSessions.length !== 1 ? "s" : ""
                                    }}</span
                                >
                            </div>
                        </div>
                    </div>

                    <!-- Progress tracker panel -->
                    <div class="progress-panel" *ngIf="showUserProgress">
                        <div class="pp-inner" *ngIf="userProgressLoading">
                            <div class="mini-spinner"></div>
                            <span>Loading progress tracker...</span>
                        </div>
                        <div
                            class="pp-empty"
                            *ngIf="!userProgressLoading && !userProgress"
                        >
                            <span>📭</span>
                            No progress data yet — this user hasn't completed
                            any sessions.
                        </div>
                        <ng-container
                            *ngIf="!userProgressLoading && userProgress"
                        >
                            <div class="pp-grid">
                                <div class="pp-stat">
                                    <div class="pp-stat-label">Level</div>
                                    <span
                                        class="level-badge"
                                        [ngClass]="
                                            'level-' +
                                            userProgress!.currentLevel
                                        "
                                    >
                                        {{ userProgress!.currentLevel }}
                                    </span>
                                </div>
                                <div class="pp-stat">
                                    <div class="pp-stat-label">
                                        Sessions Done
                                    </div>
                                    <div class="pp-stat-val">
                                        {{
                                            userProgress!.totalSessionsCompleted
                                        }}
                                    </div>
                                </div>
                                <div class="pp-stat">
                                    <div class="pp-stat-label">Avg Score</div>
                                    <div class="pp-stat-val">
                                        {{
                                            userProgress!.averageScore * 100
                                                | number: "1.0-0"
                                        }}%
                                    </div>
                                </div>
                                <div class="pp-stat">
                                    <div class="pp-stat-label">Best Score</div>
                                    <div class="pp-stat-val teal">
                                        {{
                                            userProgress!.bestScore * 100
                                                | number: "1.0-0"
                                        }}%
                                    </div>
                                </div>
                                <div class="pp-stat">
                                    <div class="pp-stat-label">
                                        Last Session
                                    </div>
                                    <div class="pp-stat-val">
                                        {{
                                            userProgress!.lastSessionAt
                                                | date: "MMM d, y"
                                        }}
                                    </div>
                                </div>
                            </div>
                            <!-- Score bars -->
                            <div class="pp-bars">
                                <div class="pp-bar-row">
                                    <span class="pp-bar-label">Average</span>
                                    <div class="pp-bar-track">
                                        <div
                                            class="pp-bar-fill pp-fill-avg"
                                            [style.width]="
                                                userProgress!.averageScore *
                                                    100 +
                                                '%'
                                            "
                                        ></div>
                                    </div>
                                    <span class="pp-bar-val"
                                        >{{
                                            userProgress!.averageScore * 100
                                                | number: "1.0-0"
                                        }}%</span
                                    >
                                </div>
                                <div class="pp-bar-row">
                                    <span class="pp-bar-label">Best</span>
                                    <div class="pp-bar-track">
                                        <div
                                            class="pp-bar-fill pp-fill-best"
                                            [style.width]="
                                                userProgress!.bestScore * 100 +
                                                '%'
                                            "
                                        ></div>
                                    </div>
                                    <span class="pp-bar-val"
                                        >{{
                                            userProgress!.bestScore * 100
                                                | number: "1.0-0"
                                        }}%</span
                                    >
                                </div>
                            </div>
                        </ng-container>
                    </div>

                    <!-- Sessions loading -->
                    <div class="int-loading" *ngIf="intSessionsLoading">
                        <div class="mini-spinner"></div>
                        Loading sessions for
                        {{ selectedInterviewUser.firstName }}...
                    </div>

                    <!-- Empty state -->
                    <div
                        class="sessions-empty"
                        *ngIf="!intSessionsLoading && intSessions.length === 0"
                    >
                        <div class="se-icon">🎙️</div>
                        <h3>No interview sessions yet</h3>
                        <p>
                            {{ selectedInterviewUser.firstName }} hasn't started
                            any mock interview sessions.
                        </p>
                    </div>

                    <!-- Sessions grid -->
                    <div
                        class="int-sessions-grid"
                        *ngIf="!intSessionsLoading && intSessions.length > 0"
                    >
                        <div
                            class="int-session-card"
                            *ngFor="let s of intSessions"
                            [class.int-selected]="
                                selectedIntSession?.id === s.id
                            "
                            (click)="selectIntSession(s)"
                        >
                            <div class="isc-top">
                                <span class="isc-type chip chip-teal">{{
                                    s.type | titlecase
                                }}</span>
                                <span
                                    class="status-chip"
                                    [ngClass]="statusChip(s.status)"
                                    >{{ s.status | titlecase }}</span
                                >
                            </div>
                            <div class="isc-industry">
                                {{ industryLabel(s.industry) }} ·
                                {{ s.targetLevel }}
                            </div>
                            <div class="isc-meta">
                                <span>{{ s.durationMinutes }}min</span>
                                <span>·</span>
                                <span>Diff {{ s.difficultyLevel }}/5</span>
                                <span>·</span>
                                <span>{{
                                    s.createdAt | date: "MMM d, y"
                                }}</span>
                            </div>
                            <div
                                class="isc-actions"
                                (click)="$event.stopPropagation()"
                            >
                                <button
                                    *ngIf="s.status === 'COMPLETED'"
                                    class="action-btn action-btn-teal"
                                    (click)="loadIntReport(s)"
                                >
                                    📊 Report
                                </button>
                                <button
                                    class="action-btn action-btn-red"
                                    (click)="adminDeleteSession(s)"
                                >
                                    🗑 Delete
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Report panel -->
                    <div
                        class="report-panel"
                        *ngIf="intReport || intReportLoading || intReportError"
                    >
                        <div class="report-panel-header">
                            <strong
                                >📊 Performance Report
                                <span *ngIf="intReport">
                                    — Session #{{ intReport.sessionId }}</span
                                >
                            </strong>
                            <button
                                class="modal-close"
                                (click)="
                                    intReport = null; intReportError = null
                                "
                            >
                                ✕
                            </button>
                        </div>
                        <div class="int-loading" *ngIf="intReportLoading">
                            <div class="mini-spinner"></div>
                            Loading report...
                        </div>
                        <div class="report-error" *ngIf="intReportError">
                            ⚠️ {{ intReportError }}
                        </div>
                        <ng-container *ngIf="intReport && !intReportLoading">
                            <div class="report-scores-grid">
                                <div class="rsg-item rsg-item-main">
                                    <div class="rsg-label">Global Score</div>
                                    <div class="rsg-val teal">
                                        {{
                                            intReport.globalScore * 100
                                                | number: "1.0-0"
                                        }}%
                                    </div>
                                </div>
                                <div class="rsg-item">
                                    <div class="rsg-label">Level</div>
                                    <span
                                        class="level-badge"
                                        [ngClass]="
                                            'level-' +
                                            intReport.preparationLevel
                                        "
                                    >
                                        {{ intReport.preparationLevel }}
                                    </span>
                                </div>
                                <div class="rsg-item">
                                    <div class="rsg-label">Communication</div>
                                    <div class="rsg-val">
                                        {{
                                            intReport.communicationScore * 100
                                                | number: "1.0-0"
                                        }}%
                                    </div>
                                </div>
                                <div class="rsg-item">
                                    <div class="rsg-label">Content Quality</div>
                                    <div class="rsg-val">
                                        {{
                                            intReport.contentQualityScore * 100
                                                | number: "1.0-0"
                                        }}%
                                    </div>
                                </div>
                                <div class="rsg-item">
                                    <div class="rsg-label">Confidence</div>
                                    <div class="rsg-val">
                                        {{
                                            intReport.confidenceScore * 100
                                                | number: "1.0-0"
                                        }}%
                                    </div>
                                </div>
                                <div class="rsg-item">
                                    <div class="rsg-label">Stress Mgmt</div>
                                    <div class="rsg-val">
                                        {{
                                            intReport.stressManagementScore *
                                                100 | number: "1.0-0"
                                        }}%
                                    </div>
                                </div>
                            </div>
                            <div
                                class="report-text-section"
                                *ngIf="intReport.topStrengths"
                            >
                                <div class="rts-label">✅ Strengths</div>
                                <p>{{ intReport.topStrengths }}</p>
                            </div>
                            <div
                                class="report-text-section"
                                *ngIf="intReport.areasForImprovement"
                            >
                                <div class="rts-label">⚠️ Areas to Improve</div>
                                <p>{{ intReport.areasForImprovement }}</p>
                            </div>
                            <div
                                class="report-text-section"
                                *ngIf="intReport.actionableRecommendations"
                            >
                                <div class="rts-label">🎯 Recommendations</div>
                                <p>{{ intReport.actionableRecommendations }}</p>
                            </div>
                        </ng-container>
                    </div>
                </ng-container>
            </ng-container>
        </div>

        <!-- User Detail Modal -->
        <div class="modal-overlay" *ngIf="selectedUser" (click)="closeDetail()">
            <div class="modal-card" (click)="$event.stopPropagation()">
                <div class="modal-header">
                    <div class="modal-user-info">
                        <div class="modal-avatar">
                            {{ getInitials(selectedUser) }}
                        </div>
                        <div>
                            <h2>
                                {{ selectedUser.firstName }}
                                {{ selectedUser.lastName }}
                            </h2>
                            <p>{{ selectedUser.email }}</p>
                        </div>
                    </div>
                    <button class="modal-close" (click)="closeDetail()">
                        ✕
                    </button>
                </div>
                <div class="modal-body">
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Status</span>
                            <span
                                class="badge"
                                [ngClass]="getStatusClass(selectedUser.status)"
                                >{{ formatStatus(selectedUser.status) }}</span
                            >
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Role</span>
                            <span class="badge badge-role">{{
                                selectedUser.role
                            }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Plan</span>
                            <span class="badge badge-plan">{{
                                selectedUser.plan
                            }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Verified</span>
                            <span
                                class="badge"
                                [ngClass]="
                                    selectedUser.isVerified
                                        ? 'badge-active'
                                        : 'badge-pending'
                                "
                            >
                                {{ selectedUser.isVerified ? "Yes" : "No" }}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Phone</span>
                            <span>{{ selectedUser.phoneNumber || "—" }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">City</span>
                            <span>{{ selectedUser.city || "—" }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Industry</span>
                            <span>{{
                                selectedUser.preferredIndustry || "—"
                            }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Language</span>
                            <span>{{
                                selectedUser.preferredLanguage || "—"
                            }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Karma Points</span>
                            <span>{{ selectedUser.karmaPoints }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Simulations</span>
                            <span
                                >{{ selectedUser.simulationsUsedThisMonth }} /
                                {{ selectedUser.simulationsLimit }}</span
                            >
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Subscription</span>
                            <span
                                class="badge"
                                [ngClass]="
                                    selectedUser.subscriptionActive
                                        ? 'badge-active'
                                        : 'badge-deleted'
                                "
                            >
                                {{
                                    selectedUser.subscriptionActive
                                        ? "Active"
                                        : "Inactive"
                                }}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Joined</span>
                            <span>{{
                                selectedUser.createdAt | date: "MMM d, y"
                            }}</span>
                        </div>
                        <div
                            class="detail-item detail-full"
                            *ngIf="selectedUser.bio"
                        >
                            <span class="detail-label">Bio</span>
                            <span>{{ selectedUser.bio }}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button
                        *ngIf="!selectedUser.isVerified"
                        class="btn-action btn-green"
                        (click)="verifyUser(selectedUser); closeDetail()"
                    >
                        ✓ Verify
                    </button>
                    <button
                        *ngIf="selectedUser.status === 'ACTIVE'"
                        class="btn-action btn-orange"
                        (click)="
                            updateStatus(selectedUser, 'SUSPENDED');
                            closeDetail()
                        "
                    >
                        Suspend
                    </button>
                    <button
                        *ngIf="selectedUser.status === 'SUSPENDED'"
                        class="btn-action btn-green"
                        (click)="
                            updateStatus(selectedUser, 'ACTIVE'); closeDetail()
                        "
                    >
                        Activate
                    </button>
                    <button
                        class="btn-action btn-red"
                        (click)="deleteUser(selectedUser); closeDetail()"
                    >
                        🗑 Delete
                    </button>
                    <button
                        *ngIf="selectedUser.status === 'DELETED'"
                        class="btn-action btn-green"
                        (click)="restoreUser(selectedUser); closeDetail()"
                    >
                        ↩ Restore
                    </button>
                    <button
                        class="btn-action btn-teal"
                        (click)="
                            viewUserInterviews(selectedUser); closeDetail()
                        "
                    >
                        🎙️ View Sessions
                    </button>
                    <button
                        class="btn-action btn-neutral"
                        (click)="closeDetail()"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            /* Tabs */
            .admin-tabs {
                display: flex;
                gap: var(--space-2);
                margin-bottom: var(--space-2);
                border-bottom: 2px solid var(--color-border);
            }
            .adm-tab {
                padding: var(--space-3) var(--space-5);
                font-size: var(--text-sm);
                font-weight: 600;
                background: none;
                border: none;
                cursor: pointer;
                color: var(--color-text-muted);
                border-bottom: 2px solid transparent;
                margin-bottom: -2px;
                transition: all 0.15s;
            }
            .adm-tab:hover {
                color: var(--teal-600);
            }
            .adm-tab.active {
                color: var(--teal-600);
                border-bottom-color: var(--teal-500);
            }

            .admin-panel {
                display: flex;
                flex-direction: column;
                gap: var(--space-6);
            }
            .admin-stats {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: var(--space-4);
            }
            .stat-box {
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: var(--radius-lg);
                padding: var(--space-5);
                text-align: center;
            }
            .stat-box-green {
                border-color: var(--success-500);
            }
            .stat-box-yellow {
                border-color: var(--warning-500);
            }
            .stat-box-red {
                border-color: var(--error-500);
            }
            .stat-value {
                font-size: var(--text-3xl);
                font-weight: 700;
                color: var(--color-text);
            }
            .stat-label {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
                margin-top: var(--space-1);
            }

            .admin-toolbar {
                display: flex;
                gap: var(--space-4);
                align-items: center;
                flex-wrap: wrap;
            }
            .search-wrap {
                position: relative;
                flex: 1;
                min-width: 200px;
            }
            .search-icon {
                position: absolute;
                left: 0.875rem;
                top: 50%;
                transform: translateY(-50%);
                font-size: 0.875rem;
                pointer-events: none;
            }
            .search-input {
                padding-left: 2.5rem;
            }
            .filter-wrap {
                display: flex;
                gap: var(--space-3);
            }
            .filter-select {
                min-width: 140px;
            }

            .admin-table-wrap {
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: var(--radius-lg);
                overflow: hidden;
            }
            .table-loading,
            .table-empty {
                padding: var(--space-8);
                text-align: center;
                color: var(--color-text-muted);
                font-size: var(--text-sm);
            }
            .admin-table {
                width: 100%;
                border-collapse: collapse;
                font-size: var(--text-sm);
            }
            .admin-table thead {
                background: var(--neutral-50);
                border-bottom: 1px solid var(--color-border);
            }
            .admin-table th {
                padding: var(--space-3) var(--space-4);
                text-align: left;
                font-weight: 600;
                color: var(--color-text-muted);
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            .admin-table td {
                padding: var(--space-3) var(--space-4);
                border-bottom: 1px solid var(--color-border-light);
                color: var(--color-text);
            }
            .admin-table tr:last-child td {
                border-bottom: none;
            }
            .user-row {
                cursor: pointer;
                transition: background 0.15s;
            }
            .user-row:hover td {
                background: var(--teal-50);
            }
            .user-cell {
                display: flex;
                align-items: center;
                gap: var(--space-3);
            }
            .user-avatar {
                width: 36px;
                height: 36px;
                border-radius: var(--radius-full);
                background: linear-gradient(
                    135deg,
                    var(--teal-300),
                    var(--cyan-300)
                );
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 0.75rem;
                font-weight: 600;
                flex-shrink: 0;
            }
            .user-name {
                font-weight: 500;
                color: var(--color-text);
            }
            .user-email {
                font-size: 0.75rem;
                color: var(--color-text-muted);
            }
            .date-cell {
                color: var(--color-text-muted);
                font-size: 0.8125rem;
            }

            .badge {
                display: inline-flex;
                align-items: center;
                padding: 0.2rem 0.6rem;
                border-radius: var(--radius-full);
                font-size: 0.7rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            .badge-active {
                background: var(--success-50);
                color: var(--success-600);
            }
            .badge-pending {
                background: var(--warning-50);
                color: var(--warning-600);
            }
            .badge-suspended {
                background: var(--error-50);
                color: var(--error-500);
            }
            .badge-deleted {
                background: var(--neutral-100);
                color: var(--neutral-500);
            }
            .badge-role {
                background: var(--teal-50);
                color: var(--teal-700);
            }
            .badge-plan {
                background: var(--cyan-50);
                color: var(--cyan-500);
            }

            .action-buttons {
                display: flex;
                align-items: center;
                gap: var(--space-2);
                flex-wrap: wrap;
            }
            .action-btn {
                padding: 0.25rem 0.625rem;
                border-radius: var(--radius-sm);
                font-size: 0.75rem;
                font-weight: 500;
                border: none;
                cursor: pointer;
                transition: opacity 0.15s;
            }
            .action-btn:hover {
                opacity: 0.8;
            }
            .action-btn-green {
                background: var(--success-50);
                color: var(--success-600);
            }
            .action-btn-orange {
                background: var(--warning-50);
                color: var(--warning-600);
            }
            .action-btn-red {
                background: var(--error-50);
                color: var(--error-500);
            }
            .action-btn-teal {
                background: var(--teal-50);
                color: var(--teal-700);
            }
            .action-select {
                padding: 0.25rem 0.5rem;
                border-radius: var(--radius-sm);
                font-size: 0.75rem;
                border: 1px solid var(--color-border);
                background: var(--color-surface);
                cursor: pointer;
            }

            .admin-pagination {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: var(--space-4);
            }
            .page-btn {
                padding: var(--space-2) var(--space-4);
                border: 1px solid var(--color-border);
                border-radius: var(--radius-md);
                background: var(--color-surface);
                color: var(--color-text);
                cursor: pointer;
                font-size: var(--text-sm);
                transition: all 0.15s;
            }
            .page-btn:hover:not(:disabled) {
                background: var(--teal-50);
                border-color: var(--teal-300);
            }
            .page-btn:disabled {
                opacity: 0.4;
                cursor: not-allowed;
            }
            .page-info {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
            }

            /* ── Interviews tab ─────────────────────────────────── */
            .user-picker-state {
                display: flex;
                flex-direction: column;
                gap: var(--space-5);
            }
            .picker-hint {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                padding: var(--space-8) var(--space-4) var(--space-4);
                color: var(--color-text-muted);
            }
            .picker-hint-icon {
                font-size: 2.5rem;
                margin-bottom: var(--space-3);
            }
            .picker-hint h3 {
                font-size: var(--text-lg);
                color: var(--color-text);
                margin: 0 0 var(--space-2);
            }
            .picker-hint p {
                font-size: var(--text-sm);
                margin: 0;
                max-width: 400px;
            }

            /* Int header */
            .int-header {
                display: flex;
                align-items: center;
                gap: var(--space-4);
                padding: var(--space-4);
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: var(--radius-lg);
            }
            .btn-back {
                background: none;
                border: 1px solid var(--color-border);
                border-radius: var(--radius-md);
                padding: var(--space-2) var(--space-3);
                font-size: var(--text-sm);
                cursor: pointer;
                color: var(--color-text-muted);
                white-space: nowrap;
                flex-shrink: 0;
            }
            .btn-back:hover {
                background: var(--neutral-50);
            }
            .int-user-pill {
                display: flex;
                align-items: center;
                gap: var(--space-3);
                flex: 1;
                min-width: 0;
            }
            .int-header-right {
                display: flex;
                align-items: center;
                gap: var(--space-3);
                margin-left: auto;
                flex-shrink: 0;
            }
            .int-session-count {
                display: flex;
                flex-direction: column;
                align-items: center;
                background: var(--teal-50);
                border-radius: var(--radius-md);
                padding: 4px 12px;
                border: 1px solid var(--teal-100);
            }
            .count-num {
                font-size: var(--text-lg);
                font-weight: 700;
                color: var(--teal-600);
                line-height: 1.2;
            }
            .count-label {
                font-size: 0.65rem;
                color: var(--teal-500);
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            /* Progress panel */
            .progress-panel {
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: var(--radius-lg);
                padding: var(--space-5);
                display: flex;
                flex-direction: column;
                gap: var(--space-4);
                animation: slideDown 0.2s ease;
            }
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-8px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .pp-inner,
            .pp-empty {
                display: flex;
                align-items: center;
                gap: var(--space-3);
                font-size: var(--text-sm);
                color: var(--color-text-muted);
                padding: var(--space-2);
            }
            .pp-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                gap: var(--space-4);
            }
            .pp-stat {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            .pp-stat-label {
                font-size: 0.65rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.06em;
                color: var(--color-text-muted);
            }
            .pp-stat-val {
                font-size: var(--text-xl);
                font-weight: 700;
                color: var(--color-text);
            }
            .pp-stat-val.teal {
                color: var(--teal-600);
            }
            .pp-bars {
                display: flex;
                flex-direction: column;
                gap: var(--space-3);
            }
            .pp-bar-row {
                display: grid;
                grid-template-columns: 80px 1fr 48px;
                align-items: center;
                gap: var(--space-3);
            }
            .pp-bar-label {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
            }
            .pp-bar-track {
                height: 8px;
                background: var(--neutral-100);
                border-radius: var(--radius-full);
                overflow: hidden;
            }
            .pp-bar-fill {
                height: 100%;
                border-radius: var(--radius-full);
                transition: width 0.6s ease;
            }
            .pp-fill-avg {
                background: linear-gradient(
                    90deg,
                    var(--teal-400),
                    var(--teal-600)
                );
            }
            .pp-fill-best {
                background: linear-gradient(90deg, #06b6d4, #0891b2);
            }
            .pp-bar-val {
                font-size: var(--text-sm);
                font-weight: 600;
                text-align: right;
            }

            /* Sessions grid */
            .int-loading {
                display: flex;
                align-items: center;
                gap: var(--space-3);
                padding: var(--space-6);
                color: var(--color-text-muted);
                font-size: var(--text-sm);
            }
            .mini-spinner {
                width: 18px;
                height: 18px;
                border: 2px solid var(--color-border);
                border-top-color: var(--teal-500);
                border-radius: 50%;
                animation: spin 0.7s linear infinite;
                flex-shrink: 0;
            }
            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }

            .sessions-empty {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: var(--space-16) var(--space-8);
                color: var(--color-text-muted);
            }
            .se-icon {
                font-size: 3rem;
                margin-bottom: var(--space-4);
            }
            .sessions-empty h3 {
                font-size: var(--text-lg);
                color: var(--color-text);
                margin: 0 0 var(--space-2);
            }
            .sessions-empty p {
                font-size: var(--text-sm);
                margin: 0;
            }

            .int-sessions-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: var(--space-4);
            }
            .int-session-card {
                background: var(--color-surface);
                border: 1.5px solid var(--color-border);
                border-radius: var(--radius-lg);
                padding: var(--space-4);
                cursor: pointer;
                transition: all 0.15s;
                display: flex;
                flex-direction: column;
                gap: var(--space-2);
            }
            .int-session-card:hover {
                border-color: var(--teal-300);
                box-shadow: var(--shadow-md);
            }
            .int-session-card.int-selected {
                border-color: var(--teal-400);
                background: var(--teal-50);
            }
            .isc-top {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .isc-type {
                font-size: 0.65rem;
            }
            .isc-industry {
                font-size: var(--text-sm);
                font-weight: 600;
                color: var(--color-text);
            }
            .isc-meta {
                font-size: var(--text-xs);
                color: var(--color-text-muted);
                display: flex;
                gap: var(--space-1);
            }
            .isc-actions {
                display: flex;
                gap: var(--space-2);
                margin-top: var(--space-2);
                padding-top: var(--space-2);
                border-top: 1px solid var(--color-border-light);
            }
            .status-chip {
                font-size: 0.6rem;
                font-weight: 600;
                padding: 2px 6px;
                border-radius: var(--radius-full);
            }
            .status-completed {
                background: #dbeafe;
                color: #1e40af;
            }
            .status-in_progress,
            .status-in-progress {
                background: #dcfce7;
                color: #166534;
            }
            .status-paused {
                background: #fef9c3;
                color: #854d0e;
            }
            .status-cancelled {
                background: #f3f4f6;
                color: #6b7280;
            }

            /* Report panel */
            .report-panel {
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: var(--radius-lg);
                padding: var(--space-5);
                display: flex;
                flex-direction: column;
                gap: var(--space-4);
                margin-top: var(--space-2);
                animation: slideDown 0.2s ease;
            }
            .report-panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: var(--text-sm);
                font-weight: 600;
                padding-bottom: var(--space-3);
                border-bottom: 1px solid var(--color-border);
            }
            .report-scores-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                gap: var(--space-4);
                padding: var(--space-4);
                background: var(--neutral-50);
                border-radius: var(--radius-md);
            }
            .rsg-item {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            .rsg-item-main {
                grid-column: span 1;
            }
            .rsg-label {
                font-size: 0.65rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.06em;
                color: var(--color-text-muted);
            }
            .rsg-val {
                font-size: var(--text-xl);
                font-weight: 700;
                color: var(--color-text);
            }
            .rsg-val.teal {
                color: var(--teal-600);
                font-size: 1.75rem;
            }
            .report-text-section {
                background: var(--neutral-50);
                border-radius: var(--radius-md);
                padding: var(--space-3);
            }
            .rts-label {
                font-size: var(--text-xs);
                font-weight: 700;
                margin-bottom: var(--space-1);
            }
            .report-text-section p {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
                margin: 0;
                line-height: var(--leading-relaxed);
            }
            .report-error {
                background: var(--error-50);
                color: var(--error-700);
                padding: var(--space-3);
                border-radius: var(--radius-md);
                font-size: var(--text-sm);
            }

            .level-badge {
                display: inline-block;
                padding: 2px 10px;
                border-radius: var(--radius-full);
                font-weight: 700;
                font-size: 0.7rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            .level-BEGINNER {
                background: #fef2f2;
                color: #b91c1c;
            }
            .level-INTERMEDIATE {
                background: #fef9c3;
                color: #854d0e;
            }
            .level-ADVANCED {
                background: #dcfce7;
                color: #166534;
            }
            .level-EXPERT {
                background: #dbeafe;
                color: #1e40af;
            }

            /* Modal */
            .modal-overlay {
                position: fixed;
                inset: 0;
                background: rgba(15, 23, 42, 0.5);
                z-index: 100;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: var(--space-4);
                backdrop-filter: blur(4px);
            }
            .modal-card {
                background: var(--color-surface);
                border-radius: var(--radius-xl);
                width: 100%;
                max-width: 560px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
            }
            .modal-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: var(--space-6);
                border-bottom: 1px solid var(--color-border);
            }
            .modal-user-info {
                display: flex;
                align-items: center;
                gap: var(--space-4);
            }
            .modal-avatar {
                width: 52px;
                height: 52px;
                border-radius: var(--radius-full);
                background: linear-gradient(
                    135deg,
                    var(--teal-400),
                    var(--cyan-400)
                );
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.1rem;
                font-weight: 700;
                flex-shrink: 0;
            }
            .modal-header h2 {
                font-size: var(--text-lg);
                font-weight: 700;
                color: var(--color-text);
                margin: 0 0 0.2rem;
            }
            .modal-header p {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
                margin: 0;
            }
            .modal-close {
                width: 32px;
                height: 32px;
                border-radius: var(--radius-full);
                border: 1px solid var(--color-border);
                background: var(--color-surface);
                color: var(--color-text-muted);
                cursor: pointer;
                font-size: 0.875rem;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.15s;
            }
            .modal-close:hover {
                background: var(--error-50);
                color: var(--error-500);
                border-color: var(--error-500);
            }
            .modal-body {
                padding: var(--space-6);
            }
            .detail-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: var(--space-4);
            }
            .detail-full {
                grid-column: 1/-1;
            }
            .detail-item {
                display: flex;
                flex-direction: column;
                gap: var(--space-1);
            }
            .detail-label {
                font-size: 0.75rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: var(--color-text-muted);
            }
            .detail-item span:last-child {
                font-size: var(--text-sm);
                color: var(--color-text);
            }
            .modal-footer {
                display: flex;
                gap: var(--space-3);
                padding: var(--space-5) var(--space-6);
                border-top: 1px solid var(--color-border);
                flex-wrap: wrap;
            }
            .btn-action {
                padding: 0.5rem 1rem;
                border-radius: var(--radius-md);
                font-size: var(--text-sm);
                font-weight: 500;
                border: none;
                cursor: pointer;
                transition: opacity 0.15s;
                font-family: var(--font-body);
            }
            .btn-action:hover {
                opacity: 0.85;
            }
            .btn-green {
                background: var(--success-50);
                color: var(--success-600);
                border: 1px solid var(--success-500);
            }
            .btn-orange {
                background: var(--warning-50);
                color: var(--warning-600);
                border: 1px solid var(--warning-500);
            }
            .btn-red {
                background: var(--error-50);
                color: var(--error-500);
                border: 1px solid var(--error-500);
            }
            .btn-teal {
                background: var(--teal-50);
                color: var(--teal-700);
                border: 1px solid var(--teal-300);
            }
            .btn-neutral {
                background: var(--neutral-100);
                color: var(--color-text-muted);
                border: 1px solid var(--color-border);
                margin-left: auto;
            }

            @media (max-width: 768px) {
                .admin-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
                .detail-grid {
                    grid-template-columns: 1fr;
                }
                .int-header {
                    flex-wrap: wrap;
                }
            }
        `,
    ],
})
export class AdminDashboardComponent implements OnInit {
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    private interviewApi = inject(InterviewApiService);
    private cdr = inject(ChangeDetectorRef);

    // ── Users tab ─────────────────────────────────────────────────────────────
    activeTab: AdminTab = "users";
    users: UserItem[] = [];
    loading = true;
    searchQuery = "";
    statusFilter = "";
    roleFilter = "";
    currentPage = 0;
    totalPages = 0;
    searchTimeout: any;
    selectedUser: UserItem | null = null;
    stats = { total: 0, active: 0, pending: 0, suspended: 0 };

    // ── Interviews tab ────────────────────────────────────────────────────────
    intUserSearch = "";
    intUserList: UserItem[] = [];
    intUserSearchTimeout: any;
    selectedInterviewUser: UserItem | null = null;

    intSessions: InterviewSessionResponse[] = [];
    intSessionsLoading = false;
    selectedIntSession: InterviewSessionResponse | null = null;

    intReport: (PerformanceReport & { sessionId?: number }) | null = null;
    intReportLoading = false;
    intReportError: string | null = null;

    showUserProgress = false;
    userProgress: ProgressTracker | null = null;
    userProgressLoading = false;

    // ── Lifecycle ─────────────────────────────────────────────────────────────
    ngOnInit(): void {
        this.loadUsers();
        this.loadStats();
    }

    // ── Users ─────────────────────────────────────────────────────────────────
    loadUsers(): void {
        this.loading = true;
        const api = environment.apiUrl;
        let url = "";
        if (this.searchQuery.trim()) {
            url = `${api}/api/users/search?query=${encodeURIComponent(this.searchQuery)}&page=${this.currentPage}&size=10`;
        } else if (this.statusFilter === "DELETED") {
            url = `${api}/api/users/deleted?page=${this.currentPage}&size=10`;
        } else if (this.statusFilter) {
            url = `${api}/api/users/by-status?status=${this.statusFilter}&page=${this.currentPage}&size=10`;
        } else if (this.roleFilter) {
            url = `${api}/api/users/by-role?role=${this.roleFilter}&page=${this.currentPage}&size=10`;
        } else {
            url = `${api}/api/users?page=${this.currentPage}&size=10`;
        }
        this.http.get<any>(url).subscribe({
            next: (res: any) => {
                this.users = [...res.content];
                this.intUserList = [...res.content];
                this.totalPages = res.totalPages || 1;
                this.loading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.loading = false;
                this.cdr.markForCheck();
            },
        });
    }

    loadStats(): void {
        this.http
            .get<any>(`${environment.apiUrl}/api/users?size=1000`)
            .subscribe({
                next: (res: any) => {
                    const users: any[] = res.content || [];
                    this.stats.total = res.totalElements || users.length;
                    this.stats.active = users.filter(
                        (u: any) => u.status === "ACTIVE",
                    ).length;
                    this.stats.pending = users.filter(
                        (u: any) => u.status === "PENDING_VERIFICATION",
                    ).length;
                    this.stats.suspended = users.filter(
                        (u: any) => u.status === "SUSPENDED",
                    ).length;
                    this.cdr.markForCheck();
                },
            });
    }

    onSearch(): void {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.currentPage = 0;
            this.loadUsers();
        }, 400);
    }

    goToPage(page: number): void {
        this.currentPage = page;
        this.loadUsers();
    }
    openDetail(user: UserItem): void {
        this.selectedUser = { ...user };
    }
    closeDetail(): void {
        this.selectedUser = null;
    }

    verifyUser(user: UserItem): void {
        this.http
            .patch(`${environment.apiUrl}/api/users/${user.id}/verify`, {})
            .subscribe({
                next: () => {
                    user.isVerified = true;
                    user.status = "ACTIVE";
                    this.loadStats();
                    this.cdr.markForCheck();
                },
            });
    }

    changeRole(user: UserItem, event: Event): void {
        const role = (event.target as HTMLSelectElement).value;
        this.http
            .patch(
                `${environment.apiUrl}/api/users/${user.id}/role?role=${role}`,
                {},
            )
            .subscribe({
                next: () => {
                    user.role = role;
                    this.cdr.markForCheck();
                },
            });
    }

    updateStatus(user: UserItem, status: string): void {
        this.http
            .patch(
                `${environment.apiUrl}/api/users/${user.id}/status?status=${status}`,
                {},
            )
            .subscribe({
                next: () => {
                    user.status = status;
                    this.loadStats();
                    this.cdr.markForCheck();
                },
            });
    }

    deleteUser(user: UserItem): void {
        if (
            !confirm(
                `Delete ${user.firstName} ${user.lastName}? This cannot be undone.`,
            )
        )
            return;
        this.http
            .delete(`${environment.apiUrl}/api/users/${user.id}`)
            .subscribe({
                next: () => {
                    this.users = this.users.filter((u) => u.id !== user.id);
                    this.loadStats();
                    this.cdr.markForCheck();
                },
            });
    }

    restoreUser(user: UserItem): void {
        this.http
            .patch(`${environment.apiUrl}/api/users/${user.id}/restore`, {})
            .subscribe({
                next: () => {
                    this.loadUsers();
                    this.loadStats();
                },
            });
    }

    // ── Interviews tab ────────────────────────────────────────────────────────
    onIntUserSearch(): void {
        clearTimeout(this.intUserSearchTimeout);
        this.intUserSearchTimeout = setTimeout(() => {
            const q = this.intUserSearch.trim().toLowerCase();
            this.intUserList = q
                ? this.users.filter((u) =>
                      `${u.firstName} ${u.lastName} ${u.email}`
                          .toLowerCase()
                          .includes(q),
                  )
                : [...this.users];
            this.cdr.markForCheck();
        }, 300);
    }

    viewUserInterviews(user: UserItem): void {
        this.selectedInterviewUser = user;
        this.activeTab = "interviews";
        this.intSessions = [];
        this.intReport = null;
        this.intReportError = null;
        this.selectedIntSession = null;
        this.showUserProgress = false;
        this.userProgress = null;
        this.intSessionsLoading = true;

        this.interviewApi.adminGetSessionsByUser(user.id).subscribe({
            next: (sessions) => {
                this.intSessions = sessions;
                this.intSessionsLoading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.intSessionsLoading = false;
                this.cdr.markForCheck();
            },
        });
    }

    clearInterviewUser(): void {
        this.selectedInterviewUser = null;
        this.intSessions = [];
        this.intReport = null;
        this.selectedIntSession = null;
        this.showUserProgress = false;
        this.userProgress = null;
    }

    selectIntSession(s: InterviewSessionResponse): void {
        this.selectedIntSession = s;
        this.intReport = null;
        this.intReportError = null;
    }

    /** Toggle progress panel — loads data on first open */
    toggleProgress(): void {
        if (!this.showUserProgress) {
            this.showUserProgress = true;
            if (!this.userProgress && this.selectedInterviewUser) {
                this.loadUserProgress(this.selectedInterviewUser.id);
            }
        } else {
            this.showUserProgress = false;
        }
    }

    loadIntReport(s: InterviewSessionResponse): void {
        this.intReportLoading = true;
        this.intReport = null;
        this.intReportError = null;
        this.interviewApi.adminGetReport(s.id).subscribe({
            next: (report) => {
                this.intReport = { ...report, sessionId: s.id };
                this.intReportLoading = false;
                this.cdr.markForCheck();
            },
            error: (err) => {
                this.intReportError =
                    err.status === 404
                        ? "No report found — session may not be completed yet."
                        : "Failed to load report.";
                this.intReportLoading = false;
                this.cdr.markForCheck();
            },
        });
    }

    adminDeleteSession(s: InterviewSessionResponse): void {
        if (
            !confirm(
                `Delete session #${s.id}? This will remove the session, all responses, and the report permanently.`,
            )
        )
            return;
        this.interviewApi.adminDeleteSession(s.id).subscribe({
            next: () => {
                this.intSessions = this.intSessions.filter(
                    (x) => x.id !== s.id,
                );
                if (this.selectedIntSession?.id === s.id)
                    this.selectedIntSession = null;
                if ((this.intReport as any)?.sessionId === s.id)
                    this.intReport = null;
                this.cdr.markForCheck();
            },
            error: () => {
                this.intReportError = "Failed to delete session.";
                this.cdr.markForCheck();
            },
        });
    }

    loadUserProgress(userId: string): void {
        this.userProgressLoading = true;
        this.userProgress = null;
        this.interviewApi.adminGetProgress(userId).subscribe({
            next: (p) => {
                this.userProgress = p;
                this.userProgressLoading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.userProgressLoading = false;
                this.cdr.markForCheck();
            },
        });
    }

    // ── Utils ─────────────────────────────────────────────────────────────────
    getInitials(user: UserItem): string {
        return (
            (user.firstName?.[0] || "") + (user.lastName?.[0] || "")
        ).toUpperCase();
    }
    formatStatus(status: string): string {
        return (
            (
                {
                    ACTIVE: "Active",
                    PENDING_VERIFICATION: "Pending",
                    SUSPENDED: "Suspended",
                    DELETED: "Deleted",
                } as any
            )[status] || status
        );
    }
    getStatusClass(status: string): string {
        return (
            (
                {
                    ACTIVE: "badge-active",
                    PENDING_VERIFICATION: "badge-pending",
                    SUSPENDED: "badge-suspended",
                    DELETED: "badge-deleted",
                } as any
            )[status] || "badge-pending"
        );
    }
    statusChip(status: string): string {
        return (
            (
                {
                    IN_PROGRESS: "status-in-progress",
                    PAUSED: "status-paused",
                    COMPLETED: "status-completed",
                    CANCELLED: "status-cancelled",
                } as any
            )[status] || ""
        );
    }
    industryLabel(industry: string): string {
        return (
            (
                {
                    IT_TECH: "IT/Tech",
                    FINANCE: "Finance",
                    HEALTH: "Health",
                    ENGINEERING: "Engineering",
                    CONSULTING: "Consulting",
                    SALES_MARKETING: "Sales & Mktg",
                } as any
            )[industry] || industry
        );
    }
}
