import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  relatedPosts: Post[] = [];
  recommendedPosts: Post[] = [];
  newsPosts: Post[] = [];
  isLoading = true;
  error: string | null = null;
  loadingMore = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.handleError('Invalid post ID');
        return;
      }
      this.loadPost(id);
      this.loadRecommendedPosts();
      this.loadNewsPosts();
    });
  }

  loadPost(id: string): void {
    this.resetState();
    this.postService.getPostById(id).subscribe({
      next: (post) => {
        if (!post) {
          this.handleError('Post not found');
          return;
        }
        this.post = post;
        this.loadRelatedPosts(post.company);
      },
      error: (err) => {
        this.handleError('Failed to load post');
        console.error('Error loading post:', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  loadRelatedPosts(company: string): void {
    this.postService.getPostsByCompany(company).subscribe({
      next: (posts) => {
        this.relatedPosts = posts
          .filter(p => p.id !== this.post?.id)
          .slice(0, 4); 
      },
      error: (err) => {
        console.error('Error loading related posts:', err);
      }
    });
  }

  loadRecommendedPosts(): void {
    this.postService.getRecommendedPosts().subscribe({
      next: (posts) => {
        this.recommendedPosts = posts.slice(0, 6); 
      },
      error: (err) => {
        console.error('Error loading recommended posts:', err);
      }
    });
  }

  loadNewsPosts(): void {
    this.postService.getNewsPosts().subscribe({
      next: (posts) => {
        this.newsPosts = posts.slice(0, 6); // Increased initial load to 6
      },
      error: (err) => {
        console.error('Error loading news posts:', err);
      }
    });
  }

  loadMoreNewsPosts(): void {
    if (this.loadingMore) return;
    this.loadingMore = true;

    this.postService.getNewsPosts().subscribe({
      next: (posts) => {
        this.newsPosts.push(...posts.slice(this.newsPosts.length, this.newsPosts.length + 6));
      },
      error: (err) => {
        console.error('Error loading more news posts:', err);
      },
      complete: () => {
        this.loadingMore = false;
      }
    });
  }

  loadMoreRecommendedPosts(): void {
    if (this.loadingMore) return;
    this.loadingMore = true;

    this.postService.getRecommendedPosts().subscribe({
      next: (posts) => {
        this.recommendedPosts.push(...posts.slice(this.recommendedPosts.length, this.recommendedPosts.length + 6));
      },
      error: (err) => {
        console.error('Error loading more recommended posts:', err);
      },
      complete: () => {
        this.loadingMore = false;
      }
    });
  }

  navigateToCompany(company: string): void {
    this.router.navigate(['/company', company.toLowerCase()]);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  private handleError(message: string): void {
    this.error = message;
    this.isLoading = false;
  }

  private resetState(): void {
    this.isLoading = true;
    this.error = null;
    this.post = null;
    this.relatedPosts = [];
    this.recommendedPosts = [];
    this.newsPosts = [];
  }
}