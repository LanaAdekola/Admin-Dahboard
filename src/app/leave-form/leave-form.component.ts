import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // Import this module
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-leave-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './leave-form.component.html',
  styleUrl: './leave-form.component.css'
})

export class LeaveFormComponent implements OnInit {
  leaveForm: FormGroup;
  relieveOfficers: string[] = ['Officer A', 'Officer B', 'Officer C', 'Officer D'];

  constructor(private fb: FormBuilder) {
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      relieveOfficer: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmitLeave() {
    if (this.leaveForm.valid) {
      const leaveData = this.leaveForm.value;
      console.log('Leave application submitted:', leaveData);
      // Handle the leave submission logic here
      // E.g., send leaveData to the server or save it locally
    }
  }

  onCancelLeave() {
    this.leaveForm.reset();
    // Additional logic for cancel action if necessary
  }
}
