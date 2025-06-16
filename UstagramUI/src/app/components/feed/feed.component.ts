import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { PostServiceService } from '../../services/post-service.service';
import { UserServiceService } from '../../services/user-service.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { FavouriteServiceService } from '../../services/favourite-service.service';
import { Post } from '../../interfaces/post';
import { User } from '../../interfaces/user';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Comment } from '../../interfaces/comment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {
  posts: (Post & { isLiked?: boolean; isFavourited?: boolean })[] = [];
  currentUser: User | null = null;
  viewedUser: User | null = null;
  isLoading = true;
  errorMessage = '';
  selectedPost: Post | null = null; 
  isMobileView = false;
  showUserProfile = false;
  private destroy$ = new Subject<void>();
  private currentPage = 1;
  private postsPerPage = 5;
  private isFetching = false;
  private hasMorePosts = true;

  constructor(
    private postService: PostServiceService,
    private userService: UserServiceService,
    private authService: AuthServiceService,
    private favouriteService: FavouriteServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.checkViewport();
    this.loadInitialData();
    this.setupScrollListener();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkViewport();
  }

  checkViewport(): void {
    this.isMobileView = window.innerWidth < 768;
  }

  loadInitialData(): void {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getUserById(userId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (user) => this.currentUser = user,
      error: (err) => console.error('Error loading user:', err)
    });

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const username = params.get('username');
      if (username) {
        this.loadUserProfile(username);
      } else {
        this.loadPosts();
      }
    });
  }

  loadUserProfile(username: string): void {
    this.showUserProfile = true;
    this.isLoading = true;

    this.userService.getUserByUsername(username).pipe(takeUntil(this.destroy$)).subscribe({
      next: (user) => {
        this.viewedUser = user;
        this.loadUserPosts(user.id);
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
        this.errorMessage = 'Could not load user profile';
        this.isLoading = false;
      }
    });
  }

  loadUserPosts(userId: string): void {
    this.postService.getPostsByUserId(userId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (posts) => {
        this.posts = posts.map(post => ({ ...post, isLiked: false, isFavourited: false }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading user posts:', err);
        this.errorMessage = 'Could not load user posts';
        this.isLoading = false;
      }
    });
  }

  loadPosts(): void {
    if (this.isFetching || !this.hasMorePosts) return;

    this.isFetching = true;
    this.postService.getAllPosts().pipe(takeUntil(this.destroy$)).subscribe({
      next: (posts) => {
        if (posts.length === 0) {
          this.hasMorePosts = false;
        } else {
          this.posts = [...this.posts, ...posts.map(post => ({ ...post, isLiked: false, isFavourited: false }))];
          this.currentPage++;
        }
        this.isLoading = false;
        this.isFetching = false;
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.errorMessage = 'Could not load posts';
        this.isLoading = false;
        this.isFetching = false;
      }
    });
  }

  setupScrollListener(): void {
    if (!this.showUserProfile) {
      window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
          this.loadPosts();
        }
      });
    }
  }

  openPostModal(post: Post): void {
    this.selectedPost = {
      ...post,
      comments: post.comments ? [...post.comments] : [] 
    };
  }

  closeModal(): void {
    this.selectedPost = null;
  }

  toggleLike(post: Post): void {
    post.likes = (post.likes || 0) + ((post as any).isLiked ? -1 : 1);
    (post as any).isLiked = !(post as any).isLiked;
    this.postService.editPost(post).subscribe();
  }

  toggleFavourite(post: Post): void {
    if (!this.currentUser) return;

    const isFavourited = (post as any).isFavourited;
    if (isFavourited) {
      this.favouriteService.deleteFavourite(post.id).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => (post as any).isFavourited = false,
        error: (err) => console.error('Error removing favourite:', err)
      });
    } else {
      const favouriteDto = { postId: post.id } as any;
      this.favouriteService.addFavourite(favouriteDto).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => (post as any).isFavourited = true,
        error: (err) => console.error('Error adding favourite:', err)
      });
    }
  }

  navigateToUserProfile(username: string): void {
    this.router.navigate(['/user', username]);
  }

  backToFeed(): void {
    this.showUserProfile = false;
    this.viewedUser = null;
    this.router.navigate(['/feed']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    window.removeEventListener('scroll', () => {});
  }
}