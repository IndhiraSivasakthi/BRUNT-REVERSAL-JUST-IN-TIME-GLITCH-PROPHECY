// src/app/services/report-issue.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// ReportIssue interface to define the shape of the issue object
export interface ReportIssue {
  productId: string;
  staffId: number;
  staffName: string;
  issueType: string;
  description: string;
  reportTime: string;
  status?: string; // ✅ Optional status
}

@Injectable({
  providedIn: 'root'
})
export class ReportIssueService {
  private apiUrl = 'http://localhost:8080/api/issues';  // Base API URL

  constructor(private http: HttpClient) {}

  // Submit a new issue report
  reportIssue(report: ReportIssue): Observable<any> {
    return this.http.post(`${this.apiUrl}/report`, report);
  }

  // Fetch all reported issues
  getAllReports(): Observable<ReportIssue[]> {
    return this.http.get<ReportIssue[]>(`${this.apiUrl}/all`);
  }

  // Fetch reports filed by a specific staff member
  getReportsByStaff(staffId: string): Observable<ReportIssue[]> {
    return this.http.get<ReportIssue[]>(`${this.apiUrl}/staff/${staffId}`);
  }

  // Update the status of a specific report
  updateReportStatus(reportId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${reportId}/status`, { status });
  }

  // Get total count of all reports
  getTotalReports(): Observable<number> {
    return this.http.get<ReportIssue[]>(`${this.apiUrl}/all`).pipe(
      map(reports => reports.length)
    );
  }
}
