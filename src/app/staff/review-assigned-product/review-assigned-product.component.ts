import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Staff } from '../../services/staff.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-assigned-product',
  templateUrl: './review-assigned-product.component.html',
  styleUrls: ['./review-assigned-product.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ReviewAssignedProductComponent implements OnInit {
  staffId: string = '';
  assignedProducts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const staff = JSON.parse(localStorage.getItem('loggedInStaff') || 'null') as Staff | null;

    if (staff && staff.staffId) {
      this.staffId = staff.staffId;
      this.fetchAssignedProducts(this.staffId);
    } else {
      console.error('Staff not found in localStorage.');
    }
  }

  fetchAssignedProducts(staffId: string): void {
    this.http.get<any[]>(`http://localhost:8080/api/assigned-products/${staffId}`).subscribe({
      next: (data) => {
        this.assignedProducts = data;
      },
      error: (error) => {
        console.error('Error fetching assigned products:', error);
      }
    });
  }
}
