import { Component } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';
import { UserDTO } from '../../../interfaces/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  currentStep = 1;
  termsAccepted = false;
  passwordStrength = 0;
  selectedFile: File | null = null;
  errorMessage: string | null = null;
  isLoading = false;
  
  regions = [
    'Andijon', 'Buxoro', 'Fargʻona', 'Jizzax', 
    'Xorazm', 'Namangan', 'Navoiy', 'Qashqadaryo',
    'Samarqand', 'Sirdaryo', 'Surxondaryo', 'Toshkent'
  ];

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

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  nextStep() {
    if (this.currentStep === 1) {
      this.checkPasswordStrength();
      if (this.passwordStrength < 2) {
        this.errorMessage = 'Password is too weak. Use at least 6 characters with letters and numbers.';
        return;
      }
    }
    this.errorMessage = null;
    this.currentStep++;
  }

  prevStep() {
    this.errorMessage = null;
    this.currentStep--;
  }

  triggerFileInput() {
    const fileInput = document.getElementById('photoUpload') as HTMLInputElement;
    fileInput.click();
  }

  handlePhotoUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'Rasm hajmi 5MB dan kichik boʻlishi kerak.';
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        this.errorMessage = 'Faqat JPEG yoki PNG rasmlar yuklanadi.';
        return;
      }
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userData.photoPath = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  checkPasswordStrength() {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

    if (strongRegex.test(this.userData.password)) {
      this.passwordStrength = 3;
    } else if (mediumRegex.test(this.userData.password)) {
      this.passwordStrength = 2;
    } else if (this.userData.password.length > 0) {
      this.passwordStrength = 1;
    } else {
      this.passwordStrength = 0;
    }
  }

  onSubmit() {
    if (!this.termsAccepted) {
      this.errorMessage = 'Please accept the terms and conditions.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const formData = new FormData();
    Object.keys(this.userData).forEach(key => {
      const value = this.userData[key as keyof UserDTO];
      if (value !== undefined && value !== null && value !== '') {
        if (key === 'photoPath' && this.selectedFile) {
          formData.append('photo', this.selectedFile, this.selectedFile.name);
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    this.authService.signup(formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/feed']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Registration failed. Please try again.';
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ');
  }
}