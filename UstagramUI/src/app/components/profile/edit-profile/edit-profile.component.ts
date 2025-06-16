import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/user-service.service';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';
import { UserDTO, User } from '../../../interfaces/user';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('300ms ease-in')
      ]),
      transition('* => void', [
        animate('300ms ease-out', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class EditProfileComponent implements OnInit {
  user: User | null = null;
  userData: UserDTO = {
    fullName: '',
    username: '',
    password: '',
    phone: '',
    location: '',
    photoPath: '',
    dob: '',
    status: '',
    masterType: '',
    bio: '',
    experience: 0,
    telegramUrl: '',
    instagramUrl: ''
  };
  selectedFile: File | null = null;
  notification: { message: string; type: 'success' | 'error' } | null = null;
  isSubmitting = false;
  regions = [
    'Andijon', 'Buxoro', 'Fargʻona', 'Jizzax', 
    'Xorazm', 'Namangan', 'Navoiy', 'Qashqadaryo',
    'Samarqand', 'Sirdaryo', 'Surxondaryo', 'Toshkent'
  ];
  masterTypes = [
    { value: 'AGROLOGIST', label: 'Agrolog' },
    { value: 'IRRIGATION', label: 'Sug\'orish mutaxassisi' },
    { value: 'CROP', label: 'Ekinlar mutaxassisi' },
    { value: 'ANIMAL', label: 'Chorvachilik mutaxassisi' }
  ];

  constructor(
    private userService: UserServiceService,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadUserData(userId);
  }

  loadUserData(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user;
        this.userData = {
          fullName: user.fullName,
          username: user.username,
          password: '',
          phone: user.phone,
          location: user.location,
          photoPath: user.photoPath,
          dob: user.dob,
          status: user.status,
          masterType: user.masterType,
          bio: user.bio,
          experience: user.experience,
          telegramUrl: user.telegramUrl,
          instagramUrl: user.instagramUrl
        };
      },
      error: (err) => {
        this.showNotification('Failed to load user data', 'error');
        console.error(err);
      }
    });
  }

  handlePhotoUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userData.photoPath = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('photoUpload') as HTMLInputElement;
    fileInput.click();
  }

  showNotification(message: string, type: 'success' | 'error'): void {
    this.notification = { message, type };
    setTimeout(() => this.notification = null, 3000);
  }

  onSubmit(): void {
    if (this.isSubmitting || !this.user) return;
    this.isSubmitting = true;

    const formData = new FormData();
    Object.keys(this.userData).forEach(key => {
      const value = this.userData[key as keyof UserDTO];
      if (key === 'photoPath' && this.selectedFile) {
        formData.append(key, this.selectedFile);
      } else if (key === 'password' && (!value || value === '')) {
        formData.append(key, 'UNCHANGED');
      } else if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      } else {
        formData.append(key, '');
      }
    });

    console.log('FormData entries:');
    formData.forEach((value, key) => console.log(`${key}: ${value}`));

    this.userService.updateUser(this.user.id, formData).subscribe({
      next: () => {
        this.showNotification('Profilingiz muvaffaqiyatli o\'zgartirildi', 'success');
        setTimeout(() => this.router.navigate(['/profile']), 1500);
      },
      error: (err) => {
        this.showNotification(err.error?.title || 'Profil o\'zgartirishda xatolik', 'error');
        this.isSubmitting = false;
        console.error('Update error:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/profile']);
  }
}