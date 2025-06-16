import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Post } from '../../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  getNews() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:5171/api/';

  constructor(private http: HttpClient) { }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}PostCreatePost`, post);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}PostUpdatePost`, post);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}PostDeletePost/${id}`);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}PostGetAllPosts`);
  }

  getPostById(id: string): Observable<Post> {
    const url = `${this.apiUrl}PostGetPostById/?id=${id}`;
    console.log('Making request to:', url); 
    
    return this.http.get<Post>(url).pipe(
      tap(response => console.log('API Response:', response)),
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => error);
      })
    );
  }

  private formatGuidForBackend(id: string): string {
    return id.replace(/-/g, '');
  }

  getLastSevenPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}PostGetLastSevenPosts`);
  }

  getRecommendedPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}PostGetRecommendedPosts`);
  }

  getPostsByCompany(company: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}PostGetPostsByCompany/${company}`);
  }

  getNewsPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}PostGetNews`);
  }
}