import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { MOCK_POSTS, TRENDING_TOPICS, WHO_TO_FOLLOW } from '../../core/data/mock-data';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, FormsModule, SectionHeaderComponent],
  template: `
    <div class="community-page animate-fade">
      <div class="page-header">
        <div>
          <h1>Community</h1>
          <p>Connect, share, and grow together with thousands of job seekers.</p>
        </div>
        <button class="btn btn-primary">+ Create Post</button>
      </div>

      <div class="community-layout">

        <!-- Feed -->
        <div class="feed-column">

          <!-- Create post panel -->
          <div class="card create-post-card">
            <div class="cp-input-row">
              <div class="avatar-placeholder avatar-md" style="font-size:0.8rem;">{{ userInitials }}</div>
              <input class="input cp-input" [(ngModel)]="newPostContent" placeholder="Share something with the community...">
            </div>
            <div class="cp-actions">
              <div class="cp-type-btns">
                <button class="btn btn-ghost btn-sm" [class.btn-active]="newPostType === 'tip'" (click)="newPostType = 'tip'">💡 Tip</button>
                <button class="btn btn-ghost btn-sm" [class.btn-active]="newPostType === 'question'" (click)="newPostType = 'question'">❓ Question</button>
                <button class="btn btn-ghost btn-sm" [class.btn-active]="newPostType === 'success'" (click)="newPostType = 'success'">🎉 Success Story</button>
                <button class="btn btn-ghost btn-sm" [class.btn-active]="newPostType === 'discussion'" (click)="newPostType = 'discussion'">💬 Discussion</button>
              </div>
              <button class="btn btn-primary btn-sm" (click)="createPost()" [disabled]="!newPostContent.trim()">Post</button>
            </div>
          </div>

          <!-- Feed filter -->
          <div class="tabs">
            <button class="tab-item" [class.active]="activeFilter === 'all'" (click)="setFilter('all')">All Posts</button>
            <button class="tab-item" [class.active]="activeFilter === 'success'" (click)="setFilter('success')">Success Stories 🎉</button>
            <button class="tab-item" [class.active]="activeFilter === 'question'" (click)="setFilter('question')">Questions ❓</button>
            <button class="tab-item" [class.active]="activeFilter === 'tip'" (click)="setFilter('tip')">Tips 💡</button>
          </div>

          <!-- Posts -->
          <div class="post-card card" *ngFor="let post of filteredPosts">
            <div class="post-header">
              <div class="avatar-placeholder avatar-md" style="font-size:0.8rem;">{{ post.authorInitials }}</div>
              <div class="post-author-info">
                <div class="post-author-name">{{ post.author }}</div>
                <div class="post-author-role">{{ post.authorTitle }}</div>
              </div>
              <span class="post-type-badge" [class]="typeChip(post.type)">{{ typeLabel(post.type) }}</span>
              <span class="post-time">{{ post.timeAgo }}</span>
            </div>

            <div class="post-content">{{ post.content }}</div>

            <div class="post-tags">
              <span *ngFor="let tag of post.tags" class="chip chip-neutral">#{{ tag }}</span>
            </div>

            <div class="post-footer">
              <button class="post-action-btn" [class.liked]="post.liked" (click)="toggleLike(post)">
                <span>{{ post.liked ? '❤️' : '👍' }}</span>
                <span>{{ post.likes }}</span>
              </button>
              <button class="post-action-btn">
                <span>💬</span>
                <span>{{ post.comments }} comments</span>
              </button>
              <button class="post-action-btn">
                <span>↗️</span>
                <span>Share</span>
              </button>
              <button class="post-action-btn" style="margin-left:auto;" [class.saved]="post.saved" (click)="toggleSave(post)">
                <span>{{ post.saved ? '🔖' : '🔖' }}</span>
                <span>{{ post.saved ? 'Saved' : 'Save' }}</span>
              </button>
            </div>

            <!-- Sample comment -->
            <div class="post-comments" *ngIf="post.comments > 0">
              <div class="comment-item">
                <div class="avatar-placeholder" style="width:28px;height:28px;font-size:0.65rem;flex-shrink:0;">ZW</div>
                <div class="comment-body">
                  <span class="comment-author">Zara Williams</span>
                  <span class="comment-text">Congratulations! This is so inspiring. What was the hardest part of the prep?</span>
                </div>
              </div>
              <button class="btn btn-ghost btn-sm" style="margin-left:var(--space-8);">View all {{ post.comments }} comments →</button>
            </div>
          </div>
        </div>

        <!-- Right Sidebar -->
        <div class="community-sidebar">

          <!-- Trending -->
          <div class="card trending-card">
            <app-section-header title="Trending Topics" icon="🔥"></app-section-header>
            <div class="trending-list">
              <div class="trending-item" *ngFor="let t of trendingTopics; let i = index">
                <span class="trending-rank">#{{ i + 1 }}</span>
                <div class="trending-body">
                  <div class="trending-tag">#{{ t.tag }}</div>
                  <div class="trending-count">{{ t.posts }} posts this week</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Who to Follow -->
          <div class="card">
            <app-section-header title="Who to Follow" icon="👥"></app-section-header>
            <div class="follow-list">
              <div class="follow-item" *ngFor="let person of whoToFollow">
                <div class="avatar-placeholder avatar-md" style="font-size:0.8rem;">{{ person.initials }}</div>
                <div class="follow-info">
                  <div class="follow-name">{{ person.name }}</div>
                  <div class="follow-title">{{ person.title }}</div>
                </div>
                <button class="btn btn-outline btn-sm">Follow</button>
              </div>
            </div>
          </div>

          <!-- Community Stats -->
          <div class="card community-stats-card">
            <app-section-header title="Community" icon="📊"></app-section-header>
            <div class="comm-stats">
              <div class="cs-item">
                <div class="cs-val">50,247</div>
                <div class="cs-label">Members</div>
              </div>
              <div class="cs-item">
                <div class="cs-val">12,803</div>
                <div class="cs-label">Posts</div>
              </div>
              <div class="cs-item">
                <div class="cs-val">94%</div>
                <div class="cs-label">Helpful rate</div>
              </div>
              <div class="cs-item">
                <div class="cs-val">1,240</div>
                <div class="cs-label">Online now</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .community-page { display: flex; flex-direction: column; gap: var(--space-6); }

    .community-layout {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: var(--space-6);
      align-items: start;
    }

    .feed-column { display: flex; flex-direction: column; gap: var(--space-4); }

    /* Create post */
    .create-post-card { }
    .cp-input-row { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4); }
    .cp-input { flex: 1; }
    .cp-actions { display: flex; align-items: center; justify-content: space-between; }
    .cp-type-btns { display: flex; gap: var(--space-1); flex-wrap: wrap; }

    /* Post card */
    .post-card { display: flex; flex-direction: column; gap: var(--space-4); }

    .post-header {
      display: flex; align-items: flex-start; gap: var(--space-3);
    }

    .post-author-info { flex: 1; }
    .post-author-name { font-size: var(--text-sm); font-weight: 700; }
    .post-author-role { font-size: var(--text-xs); color: var(--color-text-muted); }
    .post-time { font-size: var(--text-xs); color: var(--color-text-light); flex-shrink: 0; }

    .post-type-badge { flex-shrink: 0; font-size: var(--text-xs) !important; padding: 3px 8px !important; }

    .post-content {
      font-size: var(--text-sm);
      color: var(--color-text);
      line-height: var(--leading-relaxed);
      white-space: pre-wrap;
    }

    .post-tags { display: flex; flex-wrap: wrap; gap: var(--space-2); }

    .post-footer { display: flex; align-items: center; gap: var(--space-4); padding-top: var(--space-2); border-top: 1px solid var(--color-border-light); }
    .post-action-btn {
      display: flex; align-items: center; gap: var(--space-2);
      font-size: var(--text-sm); color: var(--color-text-muted);
      background: none; border: none; cursor: pointer;
      padding: var(--space-2) var(--space-3); border-radius: var(--radius-md);
      font-family: var(--font-body); font-weight: var(--weight-medium);
      transition: all var(--transition-fast);
    }
    .post-action-btn:hover { background: var(--neutral-50); color: var(--color-text); }
    .post-action-btn.liked { color: var(--error-500); }
    .post-action-btn.saved { color: var(--teal-600); }
    .btn-active { background: var(--teal-50) !important; color: var(--teal-700) !important; border-color: var(--teal-200) !important; }

    /* Comments */
    .post-comments { display: flex; flex-direction: column; gap: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--color-border-light); }
    .comment-item { display: flex; align-items: flex-start; gap: var(--space-3); }
    .comment-body { background: var(--neutral-50); border-radius: var(--radius-md); padding: var(--space-2) var(--space-3); font-size: var(--text-sm); line-height: var(--leading-relaxed); }
    .comment-author { font-weight: 700; margin-right: var(--space-2); color: var(--color-text); }
    .comment-text { color: var(--color-text-muted); }

    /* Sidebar */
    .community-sidebar { display: flex; flex-direction: column; gap: var(--space-5); }

    .trending-list { display: flex; flex-direction: column; gap: var(--space-3); }
    .trending-item { display: flex; align-items: center; gap: var(--space-3); }
    .trending-rank { font-family: var(--font-display); font-size: var(--text-sm); font-weight: 700; color: var(--color-text-light); width: 20px; }
    .trending-tag { font-size: var(--text-sm); font-weight: 600; color: var(--teal-600); }
    .trending-count { font-size: var(--text-xs); color: var(--color-text-muted); }

    .follow-list { display: flex; flex-direction: column; gap: var(--space-4); }
    .follow-item { display: flex; align-items: center; gap: var(--space-3); }
    .follow-info { flex: 1; }
    .follow-name { font-size: var(--text-sm); font-weight: 600; }
    .follow-title { font-size: var(--text-xs); color: var(--color-text-muted); }

    .comm-stats { display: grid; grid-template-columns: repeat(2,1fr); gap: var(--space-4); text-align: center; }
    .cs-val { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; color: var(--teal-600); }
    .cs-label { font-size: var(--text-xs); color: var(--color-text-muted); }

    @media (max-width: 1024px) { .community-layout { grid-template-columns: 1fr; } .community-sidebar { display: grid; grid-template-columns: repeat(2,1fr); } }
    @media (max-width: 640px) { .community-sidebar { grid-template-columns: 1fr; } }
  `]
})
export class CommunityComponent {
  private authService = inject(AuthService);

  posts: any[] = MOCK_POSTS.map(p => ({ ...p, liked: false, saved: false }));
  trendingTopics = TRENDING_TOPICS;
  whoToFollow = WHO_TO_FOLLOW;
  activeFilter = 'all';
  newPostContent = '';
  newPostType = 'discussion';

  get userInitials(): string {
    const first = this.authService.getFirstName();
    const last = this.authService.getLastName();
    return ((first?.[0] || '') + (last?.[0] || '')).toUpperCase() || 'U';
  }

  get userName(): string {
    const name = this.authService.getFullName();
    return name || 'You';
  }

  get filteredPosts(): any[] {
    if (this.activeFilter === 'all') return this.posts;
    return this.posts.filter(p => p.type === this.activeFilter);
  }

  setFilter(f: string): void { this.activeFilter = f; }

  toggleLike(post: any): void {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
  }

  toggleSave(post: any): void { post.saved = !post.saved; }

  createPost(): void {
    if (!this.newPostContent.trim()) return;
    const newPost = {
      id: Date.now(),
      author: this.userName,
      authorInitials: this.userInitials,
      authorTitle: 'Community Member',
      type: this.newPostType,
      content: this.newPostContent.trim(),
      tags: [],
      likes: 0,
      comments: 0,
      timeAgo: 'Just now',
      liked: false,
      saved: false,
    };
    this.posts = [newPost, ...this.posts];
    this.newPostContent = '';
    this.newPostType = 'discussion';
    this.activeFilter = 'all';
  }

  typeLabel(type: string): string {
    const labels: Record<string, string> = {
      success: '🎉 Success', discussion: '💬 Discussion',
      question: '❓ Question', tip: '💡 Tip'
    };
    return labels[type] || type;
  }

  typeChip(type: string): string {
    const chips: Record<string, string> = {
      success: 'chip chip-teal',
      discussion: 'chip chip-cyan',
      question: 'chip chip-sky',
      tip: 'chip chip-sand'
    };
    return chips[type] || 'chip chip-neutral';
  }
}
