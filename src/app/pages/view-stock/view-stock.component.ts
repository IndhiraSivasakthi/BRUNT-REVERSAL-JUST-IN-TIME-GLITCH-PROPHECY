import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ViewStockComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';

  // Modal: Update stock dialog
  showStockModal = false;
  selectedProduct: Product | null = null;
  stockUpdateValue: number = 0;

  // Modal: View product details modal
  showDetailsModal = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      this.filteredProducts = res;
    });
  }

  totalStock(): number {
    return this.filteredProducts.reduce((total, p) => total + p.quantity, 0);
  }

  lowStockCount(): number {
    return this.filteredProducts.filter((p) => p.quantity < 10).length;
  }

  filterProducts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter((p) => {
      return (
        (!this.selectedCategory || p.category === this.selectedCategory) &&
        (p.name.toLowerCase().includes(term) ||
          p.productCode.toLowerCase().includes(term))
      );
    });
  }

  getStockLevelColor(quantity: number): string {
    if (quantity === 0) return 'stock-red';
    if (quantity < 10) return 'stock-yellow';
    return 'stock-green';
  }

  // ✅ Open Update Stock Modal
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
        quantity: Math.max(0, this.selectedProduct.quantity + Number(this.stockUpdateValue))
      };
      this.productService.updateProduct(this.selectedProduct.id, updated).subscribe(() => {
        this.closeStockDialog();
        this.fetchProducts();
      });
    }
  }

  // ✅ Open View Details Modal
  viewDetails(product: Product): void {
    this.selectedProduct = product;
    this.showDetailsModal = true;
  }

  closeDetailsModal(): void {
    this.selectedProduct = null;
    this.showDetailsModal = false;
  }

  // ✅ QR Export
  exportQR(product: Product): void {
    this.productService.downloadQRBase64(product.qrCode, `${product.productCode}.png`);
  }

  refresh(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.fetchProducts();
  }
  zoomedImage: string | null = null;

zoomImage(image: string) {
  this.zoomedImage = image;
}

closeZoom() {
  this.zoomedImage = null;
}

}
