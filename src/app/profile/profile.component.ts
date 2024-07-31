import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  profileForm: FormGroup;
  profilePicUrl: string | ArrayBuffer | null = null;
  editMode = false;
  showUpdateSuccess: boolean = false;
  profilePicture: string = 'assets/img/profimg.png';


  constructor() {
    this.profileForm = this.fb.group({
      title: [''],
      employeeID: [''],
      state: [''],
      email: [''],
      nationality: [''],
      phoneNumber: [''],
      name: ['Ralph Edwards'] // default value for demo purpose
    });
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    // Save logic here
    this.editMode = false;
    console.log('Form data saved:', this.profileForm.value);
    if (this.profileForm.valid) {
      // Perform your save operation here

      // Show the success message
      this.showUpdateSuccess = true;

      // Hide the success message after 3 seconds
      setTimeout(() => {
        this.showUpdateSuccess = false;
      }, 3000);
    }
  }

  closePopup() {
    this.showUpdateSuccess = false;
  }
  onCancel() {
    this.editMode = false;
    // Reset the form to its initial state if needed
    this.profileForm.reset({
      title: '',
      employeeID: '',
      state: '',
      email: '',
      nationality: '',
      phoneNumber: '',
      name: 'Ralph Edwards' // default value for demo purpose
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
