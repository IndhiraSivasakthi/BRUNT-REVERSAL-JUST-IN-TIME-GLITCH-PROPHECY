import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AssignedProduct {
  staffId: string;
  productName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AssignedProductService {
  private baseUrl = 'http://localhost:8080/api/assigned-products';

  constructor(private http: HttpClient) {}

 assignProducts(payload: { staffId: string, products: string[] }) {
  return this.http.post('http://localhost:8080/api/assigned-products/assign', payload, { responseType: 'text' });
}


  unassignProduct(assignmentId: number) {
    return this.http.delete(`${this.baseUrl}/unassign/${assignmentId}`);
  }

  getAllAssignments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }
  
}
