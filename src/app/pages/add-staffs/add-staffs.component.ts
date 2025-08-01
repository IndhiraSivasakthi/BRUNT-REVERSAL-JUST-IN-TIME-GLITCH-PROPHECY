import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StaffService } from '../../services/staff.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-staffs',
  templateUrl: './add-staffs.component.html',
  styleUrls: ['./add-staffs.component.css'],
    imports: [CommonModule, ReactiveFormsModule]
  
})
export class AddStaffsComponent {
  staffForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private staffService: StaffService
  ) {
    this.initializeForm();
  }

  initializeForm(): void {
    const staffId = this.generateStaffId(); // auto-ID here
    this.staffForm = this.fb.group({
      staffId: [{ value: staffId, disabled: true }], // readonly in UI
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      contactNumber: [''],
      role: ['User'],
      notes: ['']
    });
  }

  generateStaffId(): string {
    const prefix = 'STF';
    const random = Math.floor(100000 + Math.random() * 900000); // 6-digit code
    return `${prefix}-${random}`;
  }

  onSubmit(): void {
    if (this.staffForm.invalid) {
      alert('⚠️ Please fill in all required fields correctly.');
      return;
    }

    // Get form value with disabled fields included
    const rawFormData = { ...this.staffForm.getRawValue() };

    this.staffService.addStaff(rawFormData).subscribe({
      next: () => {
        alert('✅ Staff added successfully!');
        this.initializeForm(); // reset with a new ID
      },
      error: () => {
        alert('❌ Failed to add staff. Please try again.');
      }
    });
  }

  onReset(): void {
    this.initializeForm(); // reset form and new ID
  }
}
