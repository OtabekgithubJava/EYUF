import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { PostServiceService } from '../../services/post-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { Post } from '../../interfaces/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  posts: Post[] = [];
  selectedPost: Post | null = null;
  isLoading = true;
  showDeleteSection = false;
  errorMessage = '';

  constructor(
    private userService: UserServiceService,
    private authService: AuthServiceService,
    private postService: PostServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  async loadUserData() {
    try {
      const userId = this.authService.getCurrentUserId();
      if (!userId) {
        this.router.navigate(['/login']);
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';

      const user = await this.userService.getUserById(userId).toPromise();
      if (!user) throw new Error('User not found');

      const posts = await this.postService.getMyPost().toPromise();
      this.user = user;
      this.posts = posts || [];
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
    this.selectedPost = {
      ...post,
      comments: post.comments ? [...post.comments] : []
    };
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedPost = null;
    document.body.style.overflow = 'auto';
  }
}