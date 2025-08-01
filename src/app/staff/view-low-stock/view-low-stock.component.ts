import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-low-stock',
  templateUrl: './view-low-stock.component.html',
  styleUrls: ['./view-low-stock.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ViewLowStockComponent implements OnInit {
  products: Product[] = [];
  lowStockProducts: Product[] = [];

  searchTerm: string = '';
  selectedCategory: string = '';

  showDetailsModal = false;
  selectedProduct: Product | null = null;
  zoomedImage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      this.lowStockProducts = this.products.filter(p => p.quantity < 6);
    });
  }

  totalCritical(): number {
    return this.lowStockProducts.filter(p => p.quantity <= 5).length;
  }

  lowStockCount(): number {
    return this.lowStockProducts.filter(p => p.quantity > 0 && p.quantity < 6).length;
  }

  outOfStockCount(): number {
    return this.lowStockProducts.filter(p => p.quantity === 0).length;
  }

  filterProducts(): void {
    const term = this.searchTerm.toLowerCase();
    this.lowStockProducts = this.products
      .filter(p => p.quantity < 6)
      .filter(p =>
        (!this.selectedCategory || p.category === this.selectedCategory) &&
        (p.name.toLowerCase().includes(term) || p.productCode.toLowerCase().includes(term))
      );
  }

  getStockLevelColor(quantity: number): string {
    if (quantity === 0) return 'stock-red';
    if (quantity < 3) return 'stock-yellow';
    return 'stock-green';
  }

  getStockStatus(quantity: number): string {
    if (quantity === 0) return '⛔ Out of Stock';
    return '🔴 Low Stock';
  }

  // 👁 View Product
  viewDetails(product: Product): void {
    this.selectedProduct = product;
    this.showDetailsModal = true;
  }

  closeDetailsModal(): void {
    this.selectedProduct = null;
    this.showDetailsModal = false;
  }

  exportQR(product: Product): void {
    this.productService.downloadQRBase64(product.qrCode, `${product.productCode}.png`);
  }

  zoomImage(src: string): void {
    this.zoomedImage = src;
  }

  closeZoom(): void {
    this.zoomedImage = '';
  }

  refresh(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.fetchProducts();
  }
}
