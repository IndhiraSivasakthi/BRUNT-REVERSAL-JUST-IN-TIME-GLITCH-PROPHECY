import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  productCode: string;
  name: string;
  category: string;
  brand: string;
  quantity: number;
  price: number;
  location: string;
  description: string;
  dateAdded: string;
  image1: string; // base64 string from backend
  image2: string;
  image3: string;
  qrCode: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  addProduct(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }

 
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${productId}`);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }

  updateProductWithImages(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/update-with-images`, formData);
  }

  updateQRCode(productId: number, qrCodeBase64: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${productId}/qr-code`,
      { qrCode: qrCodeBase64 }
    );
  }

  previewSKU(category: string, brand: string): Observable<string> {
    return this.http.get(
      `${this.baseUrl}/generate-code?category=${encodeURIComponent(category)}&brand=${encodeURIComponent(brand)}`,
      { responseType: 'text' }
    );
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${productId}`);
  }



  // ✅ Utility: Download QR code from base64 string
  downloadQRBase64(base64: string, filename: string): void {
    const link = document.createElement('a');
    link.href = base64;
    link.download = filename;
    link.click();
  }

// product.service.ts
getTotalProducts(): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/count`);
}

getTotalStock(): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/total-stock`);
}

getLowStockCount(threshold: number = 10): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/low-stock?threshold=${threshold}`);
}
getAllProductNames(): Observable<string[]> {
  return this.http.get<string[]>(`${this.baseUrl}/names`);
}
getProduct(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:8080/api/products/all');
}
 getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }


}
