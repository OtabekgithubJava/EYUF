import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post.service';
import { Post } from '../../models/post';
import * as jsonData from '../../data.json';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit {
  newsPosts: Post[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  // JSON fayldan ma'lumot olish
  data: Post[] = (jsonData as any).default || [];

  constructor() { }

  ngOnInit(): void {
    this.loadNewsPosts();
  }

  loadNewsPosts(): void {
    try {
      // Faqat "news" tipidagi postlarni olish
      this.newsPosts = this.data.filter(post => post.type === 'news');
      this.isLoading = false;
    } catch (err) {
      console.error('Error processing news posts:', err);
      this.errorMessage = 'Yangiliklarni yuklashda xato yuz berdi';
      this.isLoading = false;
    }
  }
}


































































// export class NewsComponent implements OnInit {
//   newsPosts: Post[] = [];
//   isLoading = true;

//   constructor(private postService: PostService) { }

//   ngOnInit(): void {
//     this.loadNewsPosts();
//   }

//   loadNewsPosts(): void {
//     this.postService.getNewsPosts().subscribe(posts => {
//       this.newsPosts = posts;
//       this.isLoading = false;
//     });
//   }
// }