import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule, MatListModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comments: string[] = [];
  @Output() commentSubmitted = new EventEmitter<string>();

  newComment: string = '';

  submitComment() {
    if (this.newComment.trim()) {
      this.commentSubmitted.emit(this.newComment);
      this.newComment = '';
    }
  }
}
