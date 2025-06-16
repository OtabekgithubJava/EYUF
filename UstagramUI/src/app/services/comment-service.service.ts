import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, CommentDTO } from '../interfaces/comment';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {
  private apiUrl = 'http://localhost:5266/api/Comment/';

  constructor(private http: HttpClient, private authService: AuthServiceService) { }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  addComment(comment: CommentDTO): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}CreateComment`, comment, this.getHeaders());
  }

  editComment(c: Comment): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}UpdateComment/${c.id}`, c, this.getHeaders());
  }

  deleteComment(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}DeleteComment/${id}`, this.getHeaders());
  }

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}GetAllComments`);
  }

  getCommentsByPost(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}GetCommentsByPost?id=${id}`);
  }
}