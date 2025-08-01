import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService, Staff } from '../../services/staff.service';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css']
})
export class StaffDashboardComponent implements OnInit {
  staffName: string = 'Warehouse Staff';
  staffId: string = '';

  constructor(private router: Router, private staffService: StaffService) {}

  ngOnInit() {
    const loggedInStaff = JSON.parse(localStorage.getItem('loggedInStaff') || 'null') as Staff | null;

    if (loggedInStaff) {
      this.staffName = loggedInStaff.fullName || 'Warehouse Staff';
      this.staffId = loggedInStaff.staffId || '';
    }
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    const loggedInStaff = JSON.parse(localStorage.getItem('loggedInStaff') || 'null');

    if (loggedInStaff && loggedInStaff.email) {
      this.staffService.updateLogoutRecord(loggedInStaff.email).subscribe({
        next: () => {
          localStorage.removeItem('loggedInStaff');
          this.router.navigate(['/staff-login']);
        },
        error: (err) => {
          console.error('Failed to update logout record:', err);
          localStorage.removeItem('loggedInStaff');
          this.router.navigate(['/staff-login']);
        }
      });
    } else {
      localStorage.removeItem('loggedInStaff');
      this.router.navigate(['/staff-login']);
    }
  }
}
