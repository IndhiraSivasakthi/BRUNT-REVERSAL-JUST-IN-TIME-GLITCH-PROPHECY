import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-staff-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.css']
})
export class StaffLoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  staffId = '';
  staffName = '';

  constructor(private staffService: StaffService, private router: Router) {}

  login(): void {
    this.staffService.loginStaff(this.email, this.password).subscribe({
      next: (staff) => {
        this.staffId = staff.staffId;
        this.staffName = staff.name;

        // ✅ Save entire staff data (including name and staffId) in localStorage
        localStorage.setItem('loggedInStaff', JSON.stringify(staff));

        // ✅ Insert login record using staffId and email
        this.staffService.insertLoginRecord(this.staffId, this.email).subscribe();

        this.successMessage = '✅ Login successful!';
        this.errorMessage = '';

        setTimeout(() => {
          this.router.navigate(['/staff-dashboard']);
        }, 1000);
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = '❌ Invalid email or password.';
        } else {
          this.errorMessage = '🚨 Server error occurred.';
        }
        this.successMessage = '';
      }
    });
  }

  // Optional - if you want to fetch staffId separately before login
  fetchStaffId(): void {
    if (this.email.trim()) {
      this.staffService.getStaffByEmail(this.email).subscribe({
        next: (staff) => {
          this.staffId = staff.staffId || '';
          this.errorMessage = '';
        },
        error: () => {
          this.staffId = '';
          this.errorMessage = '⚠️ Email not found in records.';
        }
      });
    }
  }
}
