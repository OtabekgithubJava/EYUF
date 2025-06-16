import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { PostServiceService } from '../../services/post-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { Post } from '../../interfaces/post';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  username: string = '';
  user: User | null = null;
  posts: Post[] = [];
  selectedpost: Post | null = null;
  isLoading = true;
  errorMessage = '';
  showDeleteSection = false;
  isCurrentUser = false;

  constructor(
    private userService: UserServiceService,
    private authService: AuthServiceService,
    private postService: PostServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      if (this.username) {
        this.loadUserData();
      } else {
        this.errorMessage = 'Username not provided';
        this.isLoading = false;
      }
    });
  }

  async loadUserData() {
    try {
      this.isLoading = true;
      this.errorMessage = '';

      const user = await this.userService.getUserByUsername(this.username).toPromise();
      if (!user) throw new Error('User not found');

      const posts = await this.postService.getPostsByUserId(user.id).toPromise();
      this.user = user;
      this.posts = posts || [];
      this.isCurrentUser = user.id === this.authService.getCurrentUserId();
    } catch (error: any) {
      console.error('Error loading profile:', error);
      this.errorMessage = 'Failed to load profile data';
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    } finally {
      this.isLoading = false;
    }
  }

  calculateAge(dob: string): number {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  toggleDeleteSection(): void {
    this.showDeleteSection = !this.showDeleteSection;
  }

  navigateToEdit(): void {
    this.router.navigate(['/profile/edit']);
  }

  navigateToDelete(): void {
    this.router.navigate(['/profile/delete']);
  }

  contactUser(): void {
    if (this.user?.phone) {
      window.open(`tel:${this.user.phone}`, '_blank');
    } else if (this.user?.telegramUrl) {
      window.open(this.user.telegramUrl, '_blank');
    } else {
      alert('No contact information available');
    }
  }

  shareProfile(): void {
    if (navigator.share) {
      navigator.share({
        title: `${this.user?.fullName}'s Profile`,
        text: `Check out ${this.user?.fullName}'s profile`,
        url: window.location.href
      }).catch(err => console.error('Error sharing:', err));
    } else {
      alert('Share feature not supported');
    }
  }

  openPostModal(post: Post): void {
    this.selectedpost = {
      ...post,
      comments: post.comments ? [...post.comments] : []
    };
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedpost = null;
    document.body.style.overflow = 'auto';
  }
}