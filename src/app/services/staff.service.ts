import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Staff {
  id?: number;
  staffId?: string;
  fullName: string;
  email: string;
  password: string;
  contactNumber?: string;
  role?: string;
  notes?: string;
}


@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private baseUrl = 'http://localhost:8080/api/staffs_details';

  constructor(private http: HttpClient) {}

  addStaff(staffData: Staff): Observable<any> {
    return this.http.post(`${this.baseUrl}`, staffData);
  }

  getAllStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.baseUrl);
  }

  deleteStaff(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getStaffByEmail(email: string): Observable<Staff> {
  return this.http.get<Staff>(`${this.baseUrl}/email/${email}`);
}
insertLoginRecord(staffId: string, email: string): Observable<any> {
  return this.http.post(`http://localhost:8080/api/staff-login/login-record`, { staffId, email });
}

updateLogoutRecord(email: string): Observable<any> {
  return this.http.put(`http://localhost:8080/api/staff-login/logout-record/${email}`, {});
}


  updateStaff(id: number, staff: Staff): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, staff);
  }
  loginStaff(email: string, password: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/login`, { email, password });
}
getTotalStaff(): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/count`);
}
getStaffByStaffId(staffId: string): Observable<Staff> {
    return this.http.get<Staff>(`${this.baseUrl}/staffId/${staffId}`);
  }
getAllStaffIds(): Observable<string[]> {
  return this.http.get<string[]>(`${this.baseUrl}/staff-ids`);
}


  getStaffById(staffId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-by-staffId/${staffId}`);
  }

  assignProductsToStaff(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/assign-products`, data);

  }
  getAllProductNames(): Observable<string[]> {
  return this.http.get<string[]>(`${this.baseUrl}/names`);
}
 // 🔹 Get staff by staffId
  getStaffByStaffsId(staffId: string): Observable<Staff> {
    return this.http.get<Staff>(`${this.baseUrl}/staffId/${staffId}`);
  }

  // 🔹 Full update (admin use)
  updateStaffs(id: number, staff: Staff): Observable<Staff> {
    return this.http.put<Staff>(`${this.baseUrl}/${id}`, staff);
  }
 

}
