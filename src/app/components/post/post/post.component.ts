import { Component } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common'; 
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommentComponent, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    FormsModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  constructor(private postService : PostService, private authService: AuthService) {
      this.getPosts()
  }
  liked: boolean = false
  posts: { content: string, comments: string[], likes: number, user:any }[] = [];  
  newPost: { content: string } = { content: '' };
  getPosts() {
    this.postService.getPosts().subscribe(
      (response) => {
        this.posts = response
      },
      (error) => {
      }
    );
  }
  createPost() {
    if (this.newPost.content) {
      const newPost = {
        content: this.newPost.content,
        comments: [],
        likes: 0,
        'user' : this.authService.getUserId()
      };
      this.postService.createPost(newPost).subscribe(
        (response) => {
          this.posts.push(response);  
          this.newPost.content = ''; 
        },
        (error) => {
        }
      );
    }
  }

  addComment(postIndex: any, comment: string, id: string) {
    this.postService.addComment(postIndex,this.authService.getUserId(), comment).subscribe(
      (response) => {
        this.getPosts()
      },
      (error) => {
      }
    );
  }

  likePost(postId: string) {
    this.postService.likePost(postId,this.authService.getUserId()).subscribe(
      (response) => {
        this.getPosts()
      },
      (error) => {
      }
    );
  }
  unlikePost(postId: string) {
    this.postService.unlikePost(postId,this.authService.getUserId()).subscribe(
      (response) => {
        this.getPosts()      },
      (error) => {
      }
    );
  }
}
