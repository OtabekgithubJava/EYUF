// home.component.ts
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post.service';
import { Post } from '../../models/post';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredPost: Post | null = null;
  recommendedPosts: Post[] = [];
  latestPosts: Post[] = [];
  isLoading = true;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.isLoading = true;
    
    forkJoin([
      this.postService.getRecommendedPosts(),
      this.postService.getLastSevenPosts()
    ]).subscribe({
      next: ([recommended, latest]) => {
        this.recommendedPosts = recommended;
        this.latestPosts = latest;
        this.featuredPost = recommended[0] || latest[0] || null;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.isLoading = false;
      }
    });
  }



  loadPosts(): void {
    
  }
}