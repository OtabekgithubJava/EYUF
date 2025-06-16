import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, PostDTO } from '../interfaces/post';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private apiUrl = 'http://localhost:5266/api/Post/';

  constructor(private http: HttpClient, private authService: AuthServiceService) { }

  createPost(post: PostDTO): Observable<string> {
  const formData = new FormData();
  formData.append('PostType', post.postType || '');
  formData.append('Text', post.text || '');
  formData.append('Description', post.description || '');
  formData.append('Price', post.price?.toString() || '0');
  if (post.attachment) {
    formData.append('Attachment', post.attachment);
  }
  
  formData.append('PhotoPath', post.photoPath || `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`);

  console.log('FormData entries for CreatePost:');
  formData.forEach((value, key) => console.log(`${key}: ${value instanceof File ? value.name : value}`));

  return this.http.post<string>(`${this.apiUrl}CreatePost`, formData, {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
  });
}

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}GetPostById/${id}`);
  }

  getPostAttachment(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}GetPostAttachment/${id}`, {
      responseType: 'blob'
    });
  }

  editPost(p: Post): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}UpdatePost/${p.id}`, p);
  }

  updatePost(id: string, post: PostDTO): Observable<string> {
    const formData = new FormData();
    formData.append('postType', post.postType);
    formData.append('text', post.text);
    formData.append('description', post.description);
    formData.append('price', post.price.toString());
    if (post.attachment) {
      formData.append('attachment', post.attachment);
    }
    return this.http.put<string>(`${this.apiUrl}UpdatePost/${id}`, formData);
  }

  deletePost(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}DeletePost/${id}`);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}GetAllPosts`);
  }

  getLastFive(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}GetPostsLastFive`);
  }

  getTopFive(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}GetPostsTopFive`);
  }

  getMyPost(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}GetPostByUser`);
  }

  getIshPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}GetPostsIshCategory`);
  }

  getSotuvPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}GetPostsSotuvCategory`);
  }

  getReklamaPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}GetPostsReklamaCategory`);
  }

  getPostsByUserId(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}GetPostsByUserId/user/${userId}`);
  }
}