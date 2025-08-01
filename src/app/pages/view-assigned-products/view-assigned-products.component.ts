import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface AssignedProduct {
  id: number;
  staffId: string;
  productName: string;
}

@Component({
  selector: 'app-view-assigned-products',
  standalone: true,
  templateUrl: './view-assigned-products.component.html',
  styleUrls: ['./view-assigned-products.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class ViewAssignedProductsComponent implements OnInit {
  assignedProducts: AssignedProduct[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAssignedProducts();
  }

  fetchAssignedProducts(): void {
    this.http.get<AssignedProduct[]>('http://localhost:8080/api/assigned-products/all').subscribe({
      next: (data) => {
        this.assignedProducts = data;
      },
      error: (err) => {
        console.error('Error fetching assigned products:', err);
      }
    });
  }

  unassignProduct(id: number): void {
  const confirmDelete = confirm('Are you sure you want to unassign this product?');
  if (confirmDelete) {
    this.http.delete(`http://localhost:8080/api/assigned-products/${id}`, { responseType: 'text' }).subscribe({
      next: () => {
        this.assignedProducts = this.assignedProducts.filter(p => p.id !== id);
      },
      error: (err) => {
        console.error('Error unassigning product:', err);
      }
    });
  }
}

}
