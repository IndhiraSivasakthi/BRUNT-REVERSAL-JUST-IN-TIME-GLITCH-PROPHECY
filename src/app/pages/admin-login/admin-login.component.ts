import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.successMessage = '✅ Login successful!';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/home']); // redirect on success
        }, 1000);
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = '❌ Invalid username or password.';
        } else {
          this.errorMessage = '🚨 Server error occurred.';
        }
        this.successMessage = '';
      }
    });
  }
}
