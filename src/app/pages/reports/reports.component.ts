import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: any[] = [];
  filteredReports: any[] = [];
  filterStatus: string = 'Pending'; // Default filter

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.http.get<any[]>('http://localhost:8080/api/issues/all')
      .subscribe(data => {
        this.reports = data;
        this.applyFilter();
      });
  }

  applyFilter(): void {
    if (this.filterStatus === 'All') {
      this.filteredReports = this.reports;
    } else {
      this.filteredReports = this.reports.filter(r => r.status === this.filterStatus);
    }
  }

  updateStatus(reportId: string, status: string): void {
  const payload = { status: status };
  this.http.put(`http://localhost:8080/api/issues/update-status/${reportId}`, payload)
    .subscribe(() => this.loadReports());
}


 deleteReport(reportId: string): void {
  if (confirm('Are you sure you want to delete this report?')) {
    this.http.delete(`http://localhost:8080/api/issues/delete/${reportId}`)
      .subscribe(() => this.loadReports());
  }
}

}

