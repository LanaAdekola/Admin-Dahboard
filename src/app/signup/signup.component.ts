import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  public successMessage: string | null = null;
  public errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  public onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value)
        .pipe(
          catchError(err => {
            this.errorMessage = err.message;
            this.successMessage = null;
            return of(null); // Return observable to continue with pipe
          })
        )
        .subscribe({
          next: (data: any) => {
            if (data) {
              this.successMessage = 'Account successfully created! You can now log in.';
              this.errorMessage = null;
              // Optionally, navigate to login page after a short delay
              setTimeout(() => this.router.navigate(['/login']), 2000);
            }
          },
          error: (err) => {
            this.successMessage = null;
            this.errorMessage = 'Signup failed. Please try again.';
          }
        });
    }
  }
}
