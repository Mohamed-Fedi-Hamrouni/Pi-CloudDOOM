import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ResourceApiResponse {
  id: string;
  title: string;
  description: string;
  url: string;
  type: string;
  level: string;
  industry: string;
  thumbUrl: string | null;
  categoryId: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryApiResponse {
  id: string;
  name: string;
  description: string;
  industry: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookmarkApiResponse {
  id: string;
  userId: string;
  resourceId: string;
  resource: ResourceApiResponse;
  createdAt: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements?: number;
  totalPages?: number;
  number?: number;
  size?: number;
  page?: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

@Injectable({ providedIn: 'root' })
export class ResourceApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.resourceApiUrl;

  getResources(page = 0, size = 10): Observable<PageResponse<ResourceApiResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PageResponse<ResourceApiResponse>>(`${this.apiUrl}/api/resources`, { params });
  }

  searchResources(query: string, page = 0, size = 10): Observable<PageResponse<ResourceApiResponse>> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page)
      .set('size', size);
    return this.http.get<PageResponse<ResourceApiResponse>>(`${this.apiUrl}/api/resources/search`, { params });
  }

  filterResources(industry?: string, level?: string, page = 0, size = 10): Observable<PageResponse<ResourceApiResponse>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (industry && industry !== 'ALL') {
      params = params.set('industry', industry);
    }
    if (level && level !== 'ALL') {
      params = params.set('level', level);
    }
    return this.http.get<PageResponse<ResourceApiResponse>>(`${this.apiUrl}/api/resources/filter`, { params });
  }

  getCategories(): Observable<CategoryApiResponse[]> {
    return this.http.get<CategoryApiResponse[]>(`${this.apiUrl}/api/resources/categories`);
  }

  getBookmarks(): Observable<BookmarkApiResponse[]> {
    return this.http.get<BookmarkApiResponse[]>(`${this.apiUrl}/api/resources/bookmarks`);
  }

  addBookmark(resourceId: string): Observable<BookmarkApiResponse> {
    return this.http.post<BookmarkApiResponse>(`${this.apiUrl}/api/resources/bookmarks/${resourceId}`, {});
  }

  removeBookmark(bookmarkId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/resources/bookmarks/${bookmarkId}`);
  }
}
