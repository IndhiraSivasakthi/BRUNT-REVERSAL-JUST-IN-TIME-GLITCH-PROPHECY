import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class ViewProductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      this.filteredProducts = res;
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.productCode.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory = this.selectedCategory
        ? product.category === this.selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        alert('Product deleted');
        this.fetchProducts();
      });
    }
  }

  downloadQR(product: Product): void {
    this.productService.downloadQRBase64(product.qrCode, `${product.productCode}.png`);
  }

  viewDetails(product: Product): void {
    alert(`👁 View Details for:\nName: ${product.name}\nSKU: ${product.productCode}`);
  }

  editProduct(product: Product): void {
    this.router.navigate(['/update-product', product.id]);
  }
}
