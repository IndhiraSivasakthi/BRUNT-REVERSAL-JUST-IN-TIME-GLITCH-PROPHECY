import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StaffService } from '../../services/staff.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { AssignedProductService } from '../../services/assigned_product.service';  

@Component({
  selector: 'app-assign-product',
  templateUrl: './assign-product.component.html',
  styleUrls: ['./assign-product.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule]
})
export class AssignProductComponent implements OnInit {
  assignForm: FormGroup;
  staffIds: string[] = [];
  productNames: string[] = [];
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private productService: ProductService,
      private assignedProductService: AssignedProductService, // ✅ inject it

    private router: Router
  ) {
    this.assignForm = this.fb.group({
      staffId: ['', Validators.required],
      fullName: [{ value: '', disabled: true }, Validators.required],
      product1: ['', Validators.required],
      product2: ['', Validators.required],
      product3: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadStaffs();
    this.loadProducts();
  }

  loadStaffs() {
    this.staffService.getAllStaff().subscribe({
      next: (data: any[]) => {
        this.staffIds = data.map(staff => staff.staffId);
      },
      error: (err: any) => {
        console.error('Failed to load staffs', err);
      }
    });
  }

  loadProducts() {
    this.productService.getAllProductNames().subscribe({
      next: (data: string[]) => {
        this.productNames = data;
      },
      error: (err: any) => {
        console.error('Failed to load products', err);
      }
    });
  }

  onStaffSelect(staffId: string) {
    if (staffId) {
      this.staffService.getStaffByStaffId(staffId).subscribe({
        next: (staff: any) => {
          this.assignForm.patchValue({ fullName: staff.fullName });
        },
        error: (err: any) => {
          console.error('Staff not found', err);
          this.assignForm.patchValue({ fullName: '' });
        }
      });
    }
  }

  submitAssignment() {
  if (this.assignForm.valid) {
    const staffId = this.assignForm.get('staffId')?.value;
    const products = [
      this.assignForm.get('product1')?.value,
      this.assignForm.get('product2')?.value,
      this.assignForm.get('product3')?.value
    ];

    const payload = { staffId, products };

    this.assignedProductService.assignProducts(payload).subscribe({
      next: () => {
        alert('✅ Products assigned successfully!');
        this.assignForm.reset();
      },
      error: err => {
        console.error('❌ Assignment failed:', err);
      }
    });
  } else {
    alert('❌ Please fill all fields!');
  }
}
}