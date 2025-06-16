import { Component, Input } from '@angular/core';
import { Post } from '../../../models/post'; 

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() post: Post | null = null;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() showCompany = true;
  @Input() showReadTime = true;

  get photoPath(): string {
    return this.post?.photoPath || 'assets/default-post-image.jpg';
  }

  get isRecommended(): boolean {
    return this.post?.isRecommended || false;
  }

  get title(): string {
    return this.post?.title || 'Untitled Post';
  }

  get readMinutes(): number {
    return this.post?.read_Minutes || 0;
  }

  get company(): string {
    return this.post?.company || '';
  }

  get date(): string {
    return this.post?.date || '';
  }

  get hashtags(): string[] {
    return this.post?.hashtags || [];
  }

  logNavigation(postId: string): void {
    console.log('Attempting to navigate to post ID:', postId);
    console.log('Full URL will be:', `/post/${postId}`);
  }
}