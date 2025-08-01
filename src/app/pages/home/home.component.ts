import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { StaffService } from '../../services/staff.service';
import { ReportIssueService, ReportIssue } from '../../services/report-issue.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule]  // ✅ Add this line
})

export class HomeComponent implements OnInit {
  totalProducts: number = 0;
  totalStock: number = 0;
  lowStock: number = 0;
  totalStaff: number = 0;
  totalReports: number = 0;
  pendingReports: ReportIssue[] = []; // ✅ Hold pending issues

  showNotificationModal = false; // ✅ Modal state

  constructor(
    private productService: ProductService,
    private staffService: StaffService,
    private reportIssueService: ReportIssueService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadPendingReports(); // ✅ Load notifications
  }

  loadDashboardData(): void {
    this.productService.getTotalProducts().subscribe(data => this.totalProducts = data);
    this.productService.getTotalStock().subscribe(data => this.totalStock = data);
    this.productService.getLowStockCount().subscribe(data => this.lowStock = data);
    this.staffService.getTotalStaff().subscribe(data => this.totalStaff = data);
    this.reportIssueService.getTotalReports().subscribe(data => this.totalReports = data);
  }

  loadPendingReports(): void {
    this.reportIssueService.getAllReports().subscribe((reports) => {
      this.pendingReports = reports.filter(r => r['status'] === 'Pending');
    });
  }

  openNotificationModal(): void {
    this.showNotificationModal = true;
  }

  closeNotificationModal(): void {
    this.showNotificationModal = false;
  }
}
