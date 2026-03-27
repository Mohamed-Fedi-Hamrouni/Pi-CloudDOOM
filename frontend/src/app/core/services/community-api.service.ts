import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CommunityPageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface CommunityPost {
  id: number;
  authorKeycloakId: string;
  title: string;
  content: string;
  type: string;
  industry: string | null;
  tags: string | null;
  upvotes: number;
  downvotes: number;
  viewCount: number;
  isPinned: boolean;
  isReported: boolean;
  createdAt: string;
  updatedAt: string;
  score: number;
}

export interface CreatePostBody {
  title: string;
  content: string;
  type: string;
  industry?: string;
  tags?: string;
}

export interface UpdatePostBody {
  title?: string;
  content?: string;
  type?: string;
  industry?: string;
  tags?: string;
}

export interface CommunityComment {
  id: number;
  postId: number;
  authorKeycloakId: string;
  content: string;
  parentCommentId: string | null;
  upvotes: number;
  isEdited: boolean;
  isReported: boolean;
  createdAt: string;
}

export interface CreateCommentBody {
  content: string;
  parentCommentId?: string | null;
}

export interface CommunityFollow {
  followerKeycloakId: string;
  followingKeycloakId: string;
  followedAt: string;
}

export interface FollowStatusResponse {
  following: boolean;
}

export interface KarmaResponse {
  keycloakId: string;
  displayName: string;
  totalKarma: number;
  postsCount: number;
  commentsCount: number;
  upvotesReceived: number;
  updatedAt: string;
}

export interface UserProfileResponse {
  keycloakId: string;
  displayName: string;
  totalKarma: number;
  postsCount: number;
  commentsCount: number;
  upvotesReceived: number;
  followersCount: number;
  followingCount: number;
  recentPosts: CommunityPost[];
}

@Injectable({ providedIn: 'root' })
export class CommunityApiService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.communityApiUrl}/api/community`;

  getPosts(
    page: number,
    size: number,
    type?: string,
    industry?: string,
    sort?: string
  ): Observable<CommunityPageResponse<CommunityPost>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (type) params = params.set('type', type);
    if (industry) params = params.set('industry', industry);
    if (sort) params = params.set('sort', sort);

    return this.http.get<CommunityPageResponse<CommunityPost>>(`${this.apiUrl}/posts`, { params });
  }

  getPost(id: number): Observable<CommunityPost> {
    return this.http.get<CommunityPost>(`${this.apiUrl}/posts/${id}`);
  }

  createPost(body: CreatePostBody): Observable<CommunityPost> {
    return this.http.post<CommunityPost>(`${this.apiUrl}/posts`, body);
  }

  updatePost(id: number, body: UpdatePostBody): Observable<CommunityPost> {
    return this.http.put<CommunityPost>(`${this.apiUrl}/posts/${id}`, body);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${id}`);
  }

  upvotePost(id: number): Observable<CommunityPost> {
    return this.http.post<CommunityPost>(`${this.apiUrl}/posts/${id}/upvote`, {});
  }

  downvotePost(id: number): Observable<CommunityPost> {
    return this.http.post<CommunityPost>(`${this.apiUrl}/posts/${id}/downvote`, {});
  }

  reportPost(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/posts/${id}/report`, {});
  }

  getComments(postId: number): Observable<CommunityComment[]> {
    return this.http.get<CommunityComment[]>(`${this.apiUrl}/posts/${postId}/comments`);
  }

  addComment(postId: number, body: CreateCommentBody): Observable<CommunityComment> {
    return this.http.post<CommunityComment>(`${this.apiUrl}/posts/${postId}/comments`, body);
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/comments/${id}`);
  }

  upvoteComment(id: number): Observable<CommunityComment> {
    return this.http.post<CommunityComment>(`${this.apiUrl}/comments/${id}/upvote`, {});
  }

  followUser(keycloakId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/follow/${keycloakId}`, {});
  }

  unfollowUser(keycloakId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/follow/${keycloakId}`);
  }

  isFollowing(keycloakId: string): Observable<FollowStatusResponse> {
    return this.http.get<FollowStatusResponse>(`${this.apiUrl}/follow/${keycloakId}/status`);
  }

  getFollowers(): Observable<CommunityFollow[]> {
    return this.http.get<CommunityFollow[]>(`${this.apiUrl}/follow/followers`);
  }

  getFollowing(): Observable<CommunityFollow[]> {
    return this.http.get<CommunityFollow[]>(`${this.apiUrl}/follow/following`);
  }

  getLeaderboard(): Observable<KarmaResponse[]> {
    return this.http.get<KarmaResponse[]>(`${this.apiUrl}/karma/leaderboard`);
  }

  getMyKarma(): Observable<KarmaResponse> {
    return this.http.get<KarmaResponse>(`${this.apiUrl}/karma/me`);
  }

  getUserProfile(keycloakId: string): Observable<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(`${this.apiUrl}/users/${keycloakId}/profile`);
  }

  checkIsFollowing(keycloakId: string): Observable<{ following: boolean }> {
    return this.http.get<{ following: boolean }>(`${this.apiUrl}/users/${keycloakId}/is-following`);
  }

  searchPosts(q: string, page = 0, size = 10): Observable<CommunityPageResponse<CommunityPost>> {
    const params = new HttpParams()
      .set('q', q)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<CommunityPageResponse<CommunityPost>>(`${this.apiUrl}/posts/search`, { params });
  }
}
