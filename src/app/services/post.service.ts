import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  createPost(post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, post);
  }

  likePost(postId: string, userId: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${postId}/like`, { userId });
  }

  unlikePost(postId: string, userId: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${postId}/unlike`, { userId });
  }

  addComment(postId: string, userId: any, text: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${postId}/comment`, { postId, userId, text });
  }
}
