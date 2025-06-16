import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../../services/post-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post, PostDTO } from '../../interfaces/post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  post: PostDTO = {
    postType: '',
    text: '',
    description: '',
    price: 0,
    attachment: null,
    photoPath: ''
  };
  
  isSubmitting = false;
  previewImage: string | ArrayBuffer | null = null;
  editingPostId: string | null = null;
  
  showSuccessToast = false;
  showErrorToast = false;
  successMessage = '';
  errorMessage = '';
  
  categories = [
    { value: 'Ish', label: 'Job Opportunity' },
    { value: 'Sotuv', label: 'For Sale' },
    { value: 'Reklama', label: 'Advertisement' }
  ];

  constructor(
    private postService: PostServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if (postId) {
        this.editingPostId = postId;
        this.loadPostForEdit(postId);
      }
    });
  }

  loadPostForEdit(postId: string): void {
    this.postService.getPostById(postId).subscribe({
      next: (post: Post) => {
        this.post = {
          postType: post.postType,
          text: post.text,
          description: post.description,
          price: post.price,
          photoPath: post.photoPath,
          attachment: null
        };
        
        if (post.photoPath) {
          this.postService.getPostAttachment(postId).subscribe({
            next: (file: Blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                this.previewImage = reader.result;
              };
              reader.readAsDataURL(file);
            },
            error: (err: any) => {
              console.error('Error loading image:', err);
              this.previewImage = post.photoUrl || null;
            }
          });
        }
      },
      error: (err: any) => {
        console.error('Error loading post:', err);
        this.showError('Failed to load post for editing');
        this.router.navigate(['/feed']);
      }
    });
  }

  validateFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; 
    
    if (!validTypes.includes(file.type)) {
      this.showError('Invalid file type. Please upload JPEG, PNG, or GIF.');
      return false;
    }
    
    if (file.size > maxSize) {
      this.showError('File is too large. Maximum size is 10MB.');
      return false;
    }
    
    return true;
  }

  triggerFileInput(): void {
    document.getElementById('file-replace')?.click();
  }


  onSubmit(): void {
    console.log('Submitting post:', this.post);
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    const postData: PostDTO = { ...this.post };
    if (this.editingPostId) {
      this.updatePost(postData);
    } else {
      this.createPost(postData);
    }
  }

  createPost(postData: PostDTO): void {
  if (!postData.attachment && !postData.photoPath) {
    postData.photoPath = `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
  }
  this.postService.createPost(postData).subscribe({
    next: () => {
      this.showSuccess('Post muvaffaqiyatli yaratildi!');
      setTimeout(() => {
        this.router.navigate(['/feed']);
      }, 1500);
    },
    error: (err) => {
      console.error('Error creating post:', err);
      let errorMsg = 'Post yaratishda xatolik yuz berdi.';
      if (err.error?.title) {
        errorMsg = err.error.title;
        if (err.error.errors) {
          const errorDetails = Object.values(err.error.errors)
            .flat()
            .join(' ');
          errorMsg += `: ${errorDetails}`;
        }
      }
      this.showError(errorMsg);
      this.isSubmitting = false;
    }
  });
}

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    
    if (!this.validateFile(file)) {
      return;
    }
    
    this.post.attachment = file;
    this.post.photoPath = ''; 
    
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

  removeImage(): void {
    this.previewImage = null;
    this.post.attachment = null;
    this.post.photoPath = `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`; 
  }

  updatePost(postData: PostDTO): void {
    if (!this.editingPostId) return;
    
    this.postService.updatePost(this.editingPostId, postData).subscribe({
      next: () => {
        this.showSuccess('Post muvaffaqiyatli yangilandi!');
        setTimeout(() => {
          this.router.navigate(['/feed']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error updating post:', err);
        const errorMsg = err.error?.title || err.error?.message || 'Post yangilashda xatolik yuz berdi.';
        this.showError(errorMsg);
        this.isSubmitting = false;
        setTimeout(() => {
          this.router.navigate(['/feed']);
        }, 1500);
      }
    });
  }

  cancel(): void {
    if (confirm('Haqiqatdan ham bekor qilmoqchimisiz? Saqlanmagan o\'zgarishlar yo\'qoladi.')) {
      this.router.navigate(['/feed']);
    }
  }

  showSuccess(message: string): void {
    this.successMessage = message;
    this.showSuccessToast = true;
    setTimeout(() => this.showSuccessToast = false, 3000);
  }

  showError(message: string): void {
    this.errorMessage = message; 
    this.showErrorToast = true;
    setTimeout(() => this.showErrorToast = false, 3000);
  }
}