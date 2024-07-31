import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Added CommonModule here
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent {
  leaveForm: FormGroup;
  relieveOfficers = ['Officer 1', 'Officer 2', 'Officer 3'];
  leaveHistory: any[] = [
    { type: 'Annual', startDate: '03/06/2024', endDate: '07/06/2024', status: 'Pending' },
    { type: 'Sick', startDate: '11/10/2023', endDate: '20/10/2023', status: 'Rejected' },
    { type: 'Maternity', startDate: '11/10/2023', endDate: '11/02/2023', status: 'Approved' }
  ];
  showForm = false;
  profilePicture: string = 'assets/img/profimg.png';
  profilePicUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.leaveForm = this.fb.group({
      leaveType: [''],
      relieveOfficer: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  onApplyLeave() {
    this.showForm = true;
  }

  onSubmitLeave() {
    if (this.leaveForm.valid) {
      this.leaveHistory.push({
        type: this.leaveForm.value.leaveType,
        startDate: this.leaveForm.value.startDate,
        endDate: this.leaveForm.value.endDate,
        status: 'Pending' // Default status for new leave applications
      });
      this.showForm = false;
    }
  }

  onCancelLeave() {
    this.showForm = false;
  }
}
