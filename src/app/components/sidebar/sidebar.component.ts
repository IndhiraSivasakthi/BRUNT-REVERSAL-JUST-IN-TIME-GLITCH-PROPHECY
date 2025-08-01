import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.getLoginStatus();
    this.authService.isLoggedIn$.subscribe(status => this.isLoggedIn = status);
  }

  showLoginAlert(): void {
    alert('Please log in as admin to access this feature.');
  }
  showStaffMenu = false;

  toggleStaff() {
    this.showStaffMenu = !this.showStaffMenu;
  }

 
  
}
