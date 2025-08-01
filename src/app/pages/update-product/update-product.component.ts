import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import * as QRCode from 'qrcode'; // ✅ Add this at the top

@Component({
  standalone: true,
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class UpdateProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;
  selectedProduct!: Product;
  imageFiles: File[] = [];
  imagePreviews: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.initializeForm();
    this.loadProduct();
  }

  initializeForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      location: ['', Validators.required],
      description: ['']
    });
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe((product) => {
      this.selectedProduct = product;
      this.productForm.patchValue({
        name: product.name,
        category: product.category,
        brand: product.brand,
        quantity: product.quantity,
        price: product.price,
        location: product.location,
        description: product.description,
      });
    });
  }

  onFileChange(event: any): void {
  const files: FileList = event.target.files;
  this.imageFiles = [];
  this.imagePreviews = [];

  if (files.length === 0) {
    return; // ⛔ Don't show error if user didn’t upload anything
  }

  if (files.length !== 3) {
    alert('⚠️ Please upload exactly 3 images or leave empty to keep old ones.');
    return;
  }

  for (let i = 0; i < 3; i++) {
    const file = files[i];
    this.imageFiles.push(file);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreviews.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
}

onSubmit(): void {
  if (this.productForm.invalid) {
    alert('Please complete all fields.');
    return;
  }

  const formValues = this.productForm.value;

  // ✅ STEP 1: Create QR content string
  const qrContent = `Product Code: ${this.selectedProduct.productCode}
Product Name: ${formValues.name}
Category: ${formValues.category}
Brand: ${formValues.brand}
Quantity: ${formValues.quantity}
Price (₹): ₹${formValues.price}
Location: ${formValues.location}
Description: ${formValues.description || 'N/A'}
Date Added: ${this.selectedProduct.dateAdded}`;

  // ✅ STEP 2: Generate QR Code (async)
  QRCode.toDataURL(qrContent).then((qrBase64) => {
    if (this.imageFiles.length === 3) {
      const formData = new FormData();
      formData.append('name', formValues.name);
      formData.append('category', formValues.category);
      formData.append('brand', formValues.brand);
      formData.append('quantity', formValues.quantity);
      formData.append('price', formValues.price);
      formData.append('location', formValues.location);
      formData.append('description', formValues.description);
      formData.append('image1', this.imageFiles[0]);
      formData.append('image2', this.imageFiles[1]);
      formData.append('image3', this.imageFiles[2]);

      this.productService.updateProductWithImages(this.productId, formData).subscribe(() => {
        // ✅ Save new QR code
        this.productService.updateQRCode(this.productId, qrBase64).subscribe(() => {
          alert('✅ Product updated with new images and regenerated QR!');
          this.router.navigate(['/view-product']);
        });
      });
    } else {
      const updatedProduct = {
        ...this.selectedProduct,
        ...formValues
      };

      this.productService.updateProduct(this.productId, updatedProduct).subscribe(() => {
        // ✅ Save regenerated QR
        this.productService.updateQRCode(this.productId, qrBase64).subscribe(() => {
          alert('✅ Product detail updated and new QR saved!');
          this.router.navigate(['/view-product']);
        });
      });
    }
  }).catch((err) => {
    alert('❌ Failed to generate QR code');
    console.error(err);
  });
}

  }
