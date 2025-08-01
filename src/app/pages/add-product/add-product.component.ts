import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import * as QRCode from 'qrcode';
import { ProductService } from '../../services/product.service';

@Component({
  standalone: true,
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  sku: string = '';
  qrCodeImage: string | null = null;
  images: File[] = [];
  imagePreviews: any[] = [];
  dateAdded: string = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [1, [Validators.required, Validators.min(1)]],
      location: ['', Validators.required],
      description: ['']
    });

    this.productForm.get('category')?.valueChanges.subscribe(() => this.autoGenerateSKU());
    this.productForm.get('brand')?.valueChanges.subscribe(() => this.autoGenerateSKU());
  }

  autoGenerateSKU(): void {
    const category = this.productForm.get('category')?.value;
    const brand = this.productForm.get('brand')?.value;
    if (category && brand) {
      this.productService.previewSKU(category, brand).subscribe({
        next: sku => this.sku = sku,
        error: err => console.error('SKU generation failed:', err)
      });
    }
  }

  onFileChange(event: any): void {
    const files: FileList = event.target.files;
    this.images = [];
    this.imagePreviews = [];

    if (files.length !== 3) {
      alert('❌ Please upload exactly 3 images.');
      return;
    }

    for (let i = 0; i < files.length; i++) {
      this.images.push(files[i]);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(this.sanitizer.bypassSecurityTrustUrl(e.target.result));
      };
      reader.readAsDataURL(files[i]);
    }
  }

  generateQRCode(): void {
  if (this.productForm.invalid || !this.sku) {
    alert('Please complete the form and wait for SKU to generate.');
    return;
  }

  const values = this.productForm.value;
  const today = new Date();
  this.dateAdded = today.toISOString().slice(0, 10);

  // ⚠️ Low stock check
  const lowStockNote = values.quantity < 10 ? '⚠️ LOW STOCK!' : '';

  const qrData = 
`Product Code: ${this.sku}
Product Name: ${values.name}
Category: ${values.category}
Brand: ${values.brand}
Quantity in Stock: ${values.quantity} Units ${lowStockNote}
Price (₹): ₹${values.price}
Location: ${values.location}
Description: ${values.description || 'N/A'}
Date Added: ${this.dateAdded}`;

  QRCode.toDataURL(qrData).then(qr => this.qrCodeImage = qr);
}


  submitProduct(event: Event): void {
    event.preventDefault();

    if (this.productForm.invalid || this.images.length !== 3 || !this.qrCodeImage || !this.sku) {
      alert('❌ Complete the form, select 3 images and generate QR code.');
      return;
    }

    const formData = new FormData();
    const values = this.productForm.value;

    formData.append('name', values.name);
    formData.append('category', values.category);
    formData.append('brand', values.brand);
    formData.append('quantity', values.quantity);
    formData.append('price', values.price);
    formData.append('location', values.location);
    formData.append('description', values.description || '');
    formData.append('qrCode', this.qrCodeImage!);
    formData.append('productCode', this.sku);

    formData.append('image1', this.images[0]);
    formData.append('image2', this.images[1]);
    formData.append('image3', this.images[2]);

    this.productService.addProduct(formData).subscribe({
      next: () => {
        alert('✅ Product added successfully!');
        this.resetForm();
      },
      error: (err) => {
        alert('❌ Submission failed');
        console.error(err);
      }
    });
  }

  resetForm(): void {
    this.productForm.reset();
    this.images = [];
    this.imagePreviews = [];
    this.qrCodeImage = null;
    this.sku = '';
    this.dateAdded = '';
  }
}
