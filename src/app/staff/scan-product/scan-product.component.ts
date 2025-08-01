import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReportIssueService, ReportIssue } from '../../services/report-issue.service';

declare var bootstrap: any;

@Component({
  selector: 'app-scan-product',
  templateUrl: './scan-product.component.html',
  styleUrls: ['./scan-product.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ScanProductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  uniqueCategories: string[] = [];

  searchTerm: string = '';
  selectedCategory: string = '';
  selectedQrCode: string = '';

  selectedProduct: Product | null = null;
  reportData = {
    issueType: '',
    description: ''
  };

  constructor(
    private productService: ProductService,
    private reportService: ReportIssueService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.uniqueCategories = [...new Set(data.map(p => p.category).filter(c => c))];
      },
      error: (err) => console.error('Error fetching products:', err),
    });
  }

  filterProducts(): void {
    const term = this.searchTerm.trim().toLowerCase();
    const category = this.selectedCategory;

    this.filteredProducts = this.products.filter(product => {
      const matchesNameOrId =
        product.name.toLowerCase().includes(term) ||
        product.productCode.toLowerCase().includes(term);
      const matchesCategory = !category || product.category === category;
      return matchesNameOrId && matchesCategory;
    });
  }

  openQrModal(qr: string): void {
    this.selectedQrCode = qr.startsWith('data:image') ? qr : 'data:image/png;base64,' + qr;
    const modalEl = document.getElementById('qrCodeModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  reportProduct(product: Product): void {
    this.selectedProduct = product;
    this.reportData = { issueType: '', description: '' };

    const modalEl = document.getElementById('reportIssueModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  submitReport(): void {
    if (!this.selectedProduct) return;

    const staffDataStr = localStorage.getItem('loggedInStaff');
    const loggedInStaff = staffDataStr ? JSON.parse(staffDataStr) : null;

    if (!loggedInStaff) {
      alert('⚠️ Staff not logged in. Please login again.');
      return;
    }

    const reportPayload: ReportIssue = {
      productId: this.selectedProduct.productCode,
      staffId: loggedInStaff.staffId || 'Unknown',
      staffName: loggedInStaff.name || loggedInStaff.fullName || 'Unknown Staff',
      issueType: this.reportData.issueType,
      description: this.reportData.description,
      reportTime: new Date().toISOString()
    };

    this.reportService.reportIssue(reportPayload).subscribe({
      next: () => {
        alert('✅ Issue reported successfully!');
        const modalEl = document.getElementById('reportIssueModal');
        if (modalEl) bootstrap.Modal.getInstance(modalEl)?.hide();
      },
      error: () => {
        alert('❌ Failed to report issue. Please try again.');
      }
    });
  }
}
