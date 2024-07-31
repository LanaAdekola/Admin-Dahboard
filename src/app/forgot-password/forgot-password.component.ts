import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']  // Note the correct plural form: styleUrls
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassword!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.forgotPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.forgotPassword.get('email');
  }

  onSubmit(): void {
    if (this.forgotPassword.valid) {
      // Handle the form submission logic here
      console.log(this.forgotPassword.value);
      // For example, navigate to another route
      this.router.navigate(['/create-new-password']);
    }
  }
}
