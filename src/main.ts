import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AddProductComponent } from './app/pages/add-product/add-product.component';
import { ViewProductComponent } from './app/pages/view-product/view-product.component';
import { UpdateProductComponent } from './app/pages/update-product/update-product.component';
import { AdminLoginComponent } from './app/pages/admin-login/admin-login.component';
import { ViewStockComponent } from './app/pages/view-stock/view-stock.component';
import { HomeComponent } from './app/pages/home/home.component';
import { LowStockComponent } from './app/pages/low-stock/low-stock.component';
import { AddStaffsComponent } from './app/pages/add-staffs/add-staffs.component';
import { ViewStaffsComponent } from './app/pages/view-staffs/view-staffs.component';
import { StaffLoginComponent } from './app/staff/staff-login/staff-login.component';
import { StaffDashboardComponent } from './app/staff/staff-dashboard/staff-dashboard.component';
import { ScanProductComponent } from './app/staff/scan-product/scan-product.component';
import { ReportsComponent } from './app/pages/reports/reports.component'; // ✅ Corrected path
import { AssignProductComponent } from './app/pages/assign-product/assign-product.component';
import { ViewAssignedProductsComponent } from './app/pages/view-assigned-products/view-assigned-products.component';
import { ReviewAssignedProductComponent } from './app/staff/review-assigned-product/review-assigned-product.component';
import { ViewLowStockComponent } from './app/staff/view-low-stock/view-low-stock.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'home', component: HomeComponent },
      { path: 'login', component: AdminLoginComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'view-product', component: ViewProductComponent },
      { path: 'view-stock', component: ViewStockComponent },
      { path: 'low-stock', component: LowStockComponent },
      { path: 'update-product/:id', component: UpdateProductComponent },
      { path: 'add-staff', component: AddStaffsComponent },
      { path: 'view-staff', component: ViewStaffsComponent },
      { path: 'staff-login', component: StaffLoginComponent },
      { path: 'staff-dashboard', component: StaffDashboardComponent },
      { path: 'scan-qr', component: ScanProductComponent },
      { path: 'reports', component: ReportsComponent }, // ✅ Corrected component
  {path:'view-low-stock',component: ViewLowStockComponent },
      {path:'assign-product',component:AssignProductComponent},
      {path:'view-assigned-products',component:ViewAssignedProductsComponent},
      {path:'review-assigned-product',component:ReviewAssignedProductComponent},
          
        
      
    ]),
    provideHttpClient()
  ]
});
