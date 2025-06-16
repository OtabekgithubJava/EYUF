import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsPosts: Post[] = [];
  isLoading = true;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.loadNewsPosts();
  }

  loadNewsPosts(): void {
    this.postService.getNewsPosts().subscribe(posts => {
      this.newsPosts = posts;
      this.isLoading = false;
    });
  }
}