import { Component, inject, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../core/auth/auth.service";
import { environment } from "../../../environments/environment";

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

interface PageResponse {
    content: UserItem[];
    totalElements: number;
    totalPages: number;
    numberOfElements: number;
    number: number;
    size: number;
}

@Component({
    selector: "app-admin-dashboard",
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="admin-panel">

            <!-- Admin Tab Bar -->
            <div class="admin-tab-bar">
                <button class="admin-tab" [class.active]="adminTab==='users'" (click)="adminTab='users'">👥 Users</button>
                <button class="admin-tab" [class.active]="adminTab==='library'" (click)="adminTab==='library' ? null : switchToLibrary()">📚 Library</button>
            </div>

            <!-- ── Library Management Tab ─────────────────────────────────── -->
            <div *ngIf="adminTab==='library'">
                <div class="lib-stats-row">
                    <div class="lib-stat-card">
                        <div class="lib-stat-val">{{ libStats?.totalCount ?? '…' }}</div>
                        <div class="lib-stat-lbl">Total Resources</div>
                    </div>
                    <div class="lib-stat-card lib-stat-blue">
                        <div class="lib-stat-val">{{ libStats?.videoCount ?? '…' }}</div>
                        <div class="lib-stat-lbl">Videos</div>
                    </div>
                    <div class="lib-stat-card lib-stat-green">
                        <div class="lib-stat-val">{{ libStats?.articleCount ?? '…' }}</div>
                        <div class="lib-stat-lbl">Articles</div>
                    </div>
                    <div class="lib-stat-card lib-stat-yellow">
                        <div class="lib-stat-val">{{ libStats?.podcastCount ?? '…' }}</div>
                        <div class="lib-stat-lbl">Podcasts</div>
                    </div>
                    <div class="lib-stat-card lib-stat-purple">
                        <div class="lib-stat-val">{{ libStats?.quizCount ?? '…' }}</div>
                        <div class="lib-stat-lbl">Quizzes</div>
                    </div>
                    <div class="lib-stat-card">
                        <div class="lib-stat-val">{{ libStats?.categoryCount ?? '…' }}</div>
                        <div class="lib-stat-lbl">Categories</div>
                    </div>
                    <div class="lib-stat-card lib-stat-green">
                        <div class="lib-stat-val">{{ libStats?.newThisWeek ?? '…' }}</div>
                        <div class="lib-stat-lbl">New This Week</div>
                    </div>
                </div>

                <div class="lib-actions-grid">
                    <!-- Static Seed -->
                    <div class="lib-action-card">
                        <div class="lib-action-icon">⚡</div>
                        <div class="lib-action-title">Static Seed</div>
                        <div class="lib-action-desc">Instantly seed the library with curated resources across all industries (fast, no LLM required).</div>
                        <div class="lib-action-btns">
                            <button class="btn btn-primary btn-sm" (click)="seedStatic(false)" [disabled]="libLoading">
                                {{ libLoading && libAction==='static' ? 'Seeding…' : 'Seed Library' }}
                            </button>
                            <button class="btn btn-ghost btn-sm" (click)="seedStatic(true)" [disabled]="libLoading" title="Wipe existing resources and reseed">
                                ↺ Force Reseed
                            </button>
                        </div>
                    </div>

                    <!-- AI Generate -->
                    <div class="lib-action-card">
                        <div class="lib-action-icon">🤖</div>
                        <div class="lib-action-title">AI Generate</div>
                        <div class="lib-action-desc">Generate new resources using the AI provider (Ollama / stub fallback). Pick count and optional filters.</div>
                        <div class="lib-gen-controls">
                            <div class="lib-gen-row">
                                <label class="lib-gen-lbl">Count</label>
                                <input type="number" class="input input-sm" [(ngModel)]="genCount" min="1" max="50" style="width:70px">
                            </div>
                            <div class="lib-gen-row">
                                <label class="lib-gen-lbl">Industry</label>
                                <select class="input input-sm" [(ngModel)]="genIndustry">
                                    <option value="">All</option>
                                    <option value="TECHNOLOGY">Technology</option>
                                    <option value="FINANCE">Finance</option>
                                    <option value="HEALTHCARE">Healthcare</option>
                                    <option value="EDUCATION">Education</option>
                                    <option value="MARKETING">Marketing</option>
                                    <option value="ENGINEERING">Engineering</option>
                                    <option value="CONSULTING">Consulting</option>
                                    <option value="MEDIA">Media</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                            <div class="lib-gen-row">
                                <label class="lib-gen-lbl">Level</label>
                                <select class="input input-sm" [(ngModel)]="genLevel">
                                    <option value="">Any</option>
                                    <option value="BEGINNER">Beginner</option>
                                    <option value="INTERMEDIATE">Intermediate</option>
                                    <option value="ADVANCED">Advanced</option>
                                </select>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-sm" style="margin-top:0.75rem" (click)="generateAi()" [disabled]="libLoading">
                            {{ libLoading && libAction==='generate' ? 'Generating…' : '✨ Generate' }}
                        </button>
                    </div>
                </div>

                <!-- Result banner -->
                <div class="lib-result" *ngIf="libResult">
                    <span *ngIf="libResult.created > 0" class="lib-result-ok">✓ {{ libResult.created }} resource{{ libResult.created !== 1 ? 's' : '' }} created</span>
                    <span *ngIf="libResult.skipped > 0" class="lib-result-skip">⚠ {{ libResult.skipped }} skipped (duplicates or errors)</span>
                    <span *ngIf="libResult.warnings?.length" class="lib-result-warn">{{ libResult.warnings[0] }}</span>
                </div>
                <div class="lib-result lib-result-err" *ngIf="libError">{{ libError }}</div>
            </div>

            <!-- ── Users Tab ───────────────────────────────────────────────── -->
            <div *ngIf="adminTab==='users'">

            <!-- Stats Row -->
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

            <!-- Search and Filters -->
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
                        <option value="PENDING_VERIFICATION">Pending</option>
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

            <!-- Users Table -->
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
                                        <option value="STUDENT">STUDENT</option>
                                        <option value="MENTOR">MENTOR</option>
                                        <option value="MANAGER">MANAGER</option>
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
                                        (click)="updateStatus(user, 'ACTIVE')"
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
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div *ngIf="!loading && users.length === 0" class="table-empty">
                    No users found.
                </div>
            </div>

            <!-- Pagination -->
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
                            >
                                {{ formatStatus(selectedUser.status) }}
                            </span>
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
                            <span class="detail-label">Simulations Used</span>
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
                        ✓ Verify Account
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
                        🗑 Delete User
                    </button>
                    <button
                        *ngIf="selectedUser.status === 'DELETED'"
                        class="btn-action btn-green"
                        (click)="restoreUser(selectedUser); closeDetail()"
                    >
                        ↩ Restore User
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

        </div> <!-- /admin-panel -->
    `,
    styles: [
        `
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
                grid-column: 1 / -1;
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
            .btn-neutral {
                background: var(--neutral-100);
                color: var(--color-text-muted);
                border: 1px solid var(--color-border);
                margin-left: auto;
            }

            /* Admin tabs */
            .admin-tab-bar {
                display: flex;
                gap: 0.25rem;
                border-bottom: 1px solid var(--color-border);
                margin-bottom: 1.5rem;
            }
            .admin-tab {
                padding: 0.5rem 1.25rem;
                border: none;
                background: none;
                color: var(--color-text-muted);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                border-bottom: 2px solid transparent;
                margin-bottom: -1px;
                transition: all 0.15s;
                font-family: var(--font-body);
            }
            .admin-tab:hover { color: var(--teal-600); }
            .admin-tab.active { color: var(--teal-600); border-bottom-color: var(--teal-500); font-weight: 600; }

            /* Library tab */
            .lib-stats-row {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: var(--space-3);
                margin-bottom: var(--space-6);
            }
            .lib-stat-card {
                background: var(--neutral-50);
                border: 1px solid var(--color-border-light);
                border-radius: var(--radius-lg);
                padding: var(--space-4);
                text-align: center;
            }
            .lib-stat-card.lib-stat-blue { background: var(--cyan-50); border-color: var(--cyan-100); }
            .lib-stat-card.lib-stat-green { background: var(--teal-50); border-color: var(--teal-100); }
            .lib-stat-card.lib-stat-yellow { background: var(--warning-50, #fffbeb); border-color: var(--warning-200, #fde68a); }
            .lib-stat-card.lib-stat-purple { background: #f5f3ff; border-color: #e9d5ff; }
            .lib-stat-val { font-size: 1.5rem; font-weight: 700; color: var(--teal-600); font-family: var(--font-display); }
            .lib-stat-lbl { font-size: 0.7rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.04em; margin-top: 2px; }

            .lib-actions-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: var(--space-5);
                margin-bottom: var(--space-5);
            }
            .lib-action-card {
                border: 1px solid var(--color-border);
                border-radius: var(--radius-xl);
                padding: var(--space-6);
                background: var(--color-surface);
            }
            .lib-action-icon { font-size: 2rem; margin-bottom: var(--space-3); }
            .lib-action-title { font-size: var(--text-base); font-weight: 700; margin-bottom: var(--space-2); }
            .lib-action-desc { font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.5; margin-bottom: var(--space-4); }
            .lib-action-btns { display: flex; gap: var(--space-2); flex-wrap: wrap; }

            .lib-gen-controls { display: flex; flex-direction: column; gap: var(--space-3); }
            .lib-gen-row { display: flex; align-items: center; gap: var(--space-3); }
            .lib-gen-lbl { font-size: var(--text-xs); font-weight: 600; color: var(--color-text-muted); width: 60px; flex-shrink: 0; }
            .input-sm { padding: 0.25rem 0.5rem; font-size: var(--text-sm); }

            .lib-result { display: flex; flex-wrap: wrap; gap: var(--space-4); padding: var(--space-3) var(--space-4); border-radius: var(--radius-lg); background: var(--teal-50); border: 1px solid var(--teal-100); font-size: var(--text-sm); }
            .lib-result-ok { color: var(--success-600); font-weight: 600; }
            .lib-result-skip { color: var(--warning-600); }
            .lib-result-warn { color: var(--color-text-muted); }
            .lib-result-err { background: var(--error-50); border-color: var(--error-200); color: var(--error-600); }

            @media (max-width: 900px) {
                .lib-stats-row { grid-template-columns: repeat(4, 1fr); }
                .lib-actions-grid { grid-template-columns: 1fr; }
            }

            @media (max-width: 768px) {
                .admin-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
                .detail-grid {
                    grid-template-columns: 1fr;
                }
                .lib-stats-row { grid-template-columns: repeat(2, 1fr); }
            }
        `,
    ],
})
export class AdminDashboardComponent implements OnInit {
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    private cdr = inject(ChangeDetectorRef);

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

    // Library tab
    adminTab = 'users';
    libStats: any = null;
    libLoading = false;
    libAction = '';
    libResult: any = null;
    libError = '';
    genCount = 10;
    genIndustry = '';
    genLevel = '';

    ngOnInit(): void {
        this.loadUsers();
        this.loadStats();
    }

    switchToLibrary(): void {
        this.adminTab = 'library';
        this.libResult = null;
        this.libError = '';
        this.loadLibStats();
        this.cdr.detectChanges();
    }

    loadLibStats(): void {
        this.http.get<any>(`${environment.resourceApiUrl}/api/resources/stats`).subscribe({
            next: (s) => { this.libStats = s; this.cdr.detectChanges(); },
            error: () => {}
        });
    }

    seedStatic(force: boolean): void {
        this.libLoading = true;
        this.libAction = 'static';
        this.libResult = null;
        this.libError = '';
        this.http.post<any>(`${environment.resourceApiUrl}/api/resources/ai/seed/static?forceReseed=${force}`, {}).subscribe({
            next: (res) => {
                this.libResult = res;
                this.libLoading = false;
                this.loadLibStats();
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.libError = err?.error?.message || 'Seed failed. Check logs.';
                this.libLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    generateAi(): void {
        this.libLoading = true;
        this.libAction = 'generate';
        this.libResult = null;
        this.libError = '';
        const body: any = { count: this.genCount };
        if (this.genIndustry) body['industry'] = this.genIndustry;
        if (this.genLevel) body['level'] = this.genLevel;
        this.http.post<any>(`${environment.resourceApiUrl}/api/resources/ai/generate`, body).subscribe({
            next: (res) => {
                this.libResult = res;
                this.libLoading = false;
                this.loadLibStats();
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.libError = err?.error?.message || 'Generation failed. Check logs.';
                this.libLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

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
                this.totalPages = res.totalPages || 1;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.loading = false;
                this.cdr.detectChanges();
            },
        });
    }

    loadStats(): void {
        const api = environment.apiUrl;
        this.http.get<any>(`${api}/api/users?size=1000`).subscribe({
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
                this.cdr.detectChanges();
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
                next: (res: any) => {
                    user.isVerified = true;
                    user.status = "ACTIVE";
                    this.loadStats();
                    this.cdr.detectChanges();
                },
                error: (err) => console.error("Verify error:", err),
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
                    this.cdr.detectChanges();
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
                    this.cdr.detectChanges();
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
                    this.cdr.detectChanges();
                },
            });
    }

    getInitials(user: UserItem): string {
        return (
            (user.firstName?.[0] || "") + (user.lastName?.[0] || "")
        ).toUpperCase();
    }

    formatStatus(status: string): string {
        const map: Record<string, string> = {
            ACTIVE: "Active",
            PENDING_VERIFICATION: "Pending",
            SUSPENDED: "Suspended",
            DELETED: "Deleted",
        };
        return map[status] || status;
    }

    getStatusClass(status: string): string {
        const map: Record<string, string> = {
            ACTIVE: "badge-active",
            PENDING_VERIFICATION: "badge-pending",
            SUSPENDED: "badge-suspended",
            DELETED: "badge-deleted",
        };
        return map[status] || "badge-pending";
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
}
