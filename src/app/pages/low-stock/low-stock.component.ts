import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-low-stock',
  templateUrl: './low-stock.component.html',
  styleUrls: ['./low-stock.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LowStockComponent implements OnInit {
  products: Product[] = [];
  lowStockProducts: Product[] = [];

  searchTerm: string = '';
  selectedCategory: string = '';

  showStockModal = false;
  showDetailsModal = false;
  selectedProduct: Product | null = null;
  stockUpdateValue: number = 0;
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

  // 📝 Restock Modal
  openStockDialog(product: Product): void {
    this.selectedProduct = product;
    this.stockUpdateValue = 0;
    this.showStockModal = true;
  }

  closeStockDialog(): void {
    this.selectedProduct = null;
    this.stockUpdateValue = 0;
    this.showStockModal = false;
  }

  applyStockUpdate(): void {
    if (this.selectedProduct) {
      const updated = {
        ...this.selectedProduct,
        quantity: Math.max(0, this.selectedProduct.quantity + Number(this.stockUpdateValue)),
      };
      this.productService.updateProduct(this.selectedProduct.id, updated).subscribe(() => {
        this.closeStockDialog();
        this.fetchProducts();
      });
    }
  }

  exportQR(product: Product): void {
    this.productService.downloadQRBase64(product.qrCode, `${product.productCode}.png`);
  }

  zoomImage(src: string) {
    this.zoomedImage = src;
  }

  closeZoom() {
    this.zoomedImage = '';
  }

  refresh(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.fetchProducts();
  }
}
