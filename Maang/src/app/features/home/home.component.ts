// home.component.ts
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post.service';
import { Post } from '../../models/post';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import * as jsonData from '../../data.json';
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
  errorMessage: string | null = null;

  // JSON fayldan ma'lumot olish
  data: Post[] = (jsonData as any).default || [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.isLoading = true;
    try {
      // Tavsiya etilgan postlarni olish
      this.recommendedPosts = this.getRecommended();
      // So'nggi 7 postni olish
      this.latestPosts = this.getLastSevenPosts();
      // Featured postni belgilash
      this.featuredPost = this.recommendedPosts[0] || this.latestPosts[0] || null;
      this.isLoading = false;
    } catch (err) {
      console.error('Error processing posts:', err);
      this.errorMessage = 'Ma\'lumotlarni yuklashda xato yuz berdi';
      this.isLoading = false;
    }
  }

  // Tavsiya etilgan postlarni olish uchun funksiya
  getRecommended(): Post[] {
    const recommended: Post[] = [];
    for (const post of this.data) {
      if (post.isRecommended) {
        recommended.push(post);
      }
    }
    return recommended;
  }

  // So'nggi 7 postni olish uchun funksiya
  getLastSevenPosts(): Post[] {
    return this.data
      .sort((a, b) => {
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
      })
      .slice(0, 7);
  }

  loadPosts(): void {
    // Agar keyinchalik qo'shimcha postlar yuklash kerak bo'lsa
  }
}


































































































































// export class HomeComponent implements OnInit {
//   featuredPost: Post | null = null;
//   recommendedPosts: Post[] = [];
//   latestPosts: Post[] = [];
//   isLoading = true;

//   constructor(
//     private postService: PostService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//       this.isLoading = true;
    
//     forkJoin([
//       this.postService.getRecommendedPosts(),
//       this.postService.getLastSevenPosts()
//     ]).subscribe({
//       next: ([recommended, latest]) => {
//         this.recommendedPosts = recommended;
//         this.latestPosts = latest;
//         this.featuredPost = recommended[0] || latest[0] || null;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.error('Error loading posts:', err);
//         this.isLoading = false;
//       }
//     });
//   }
//   data: any = (jsonData as any).default;



//   loadPosts(): void {
    
//   }
// }