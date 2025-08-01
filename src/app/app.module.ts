import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// 🧩 Core Component
import { AppComponent } from './app.component';

// 🔁 Shared UI Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// 📦 Admin Pages
import { AddProductComponent } from './pages/add-product/add-product.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { ViewStockComponent } from './pages/view-stock/view-stock.component';
import { LowStockComponent } from './pages/low-stock/low-stock.component';
import { AddStaffsComponent } from './pages/add-staffs/add-staffs.component';
import { ViewStaffsComponent } from './pages/view-staffs/view-staffs.component';
import { ReportsComponent } from './pages/reports/reports.component';

// 👷 Staff Pages
import { StaffLoginComponent } from './staff/staff-login/staff-login.component';
import { StaffDashboardComponent } from './staff/staff-dashboard/staff-dashboard.component';
import { ScanProductComponent } from './staff/scan-product/scan-product.component';
import { AssignProductComponent } from './pages/assign-product/assign-product.component';
import { ViewAssignedProductsComponent } from './pages/view-assigned-products/view-assigned-products.component';
import { ReviewAssignedProductComponent } from './staff/review-assigned-product/review-assigned-product.component';
import { ViewLowStockComponent } from './staff/view-low-stock/view-low-stock.component';

const routes: Routes = [
  // 🔐 Auth Routes
  { path: 'login', component: AdminLoginComponent },
  { path: 'staff-login', component: StaffLoginComponent },

  // 🧑‍💼 Admin Dashboard
  { path: 'add-product', component: AddProductComponent },
  { path: 'view-stock', component: ViewStockComponent },
  { path: 'low-stock', component: LowStockComponent },
  { path: 'add-staff', component: AddStaffsComponent },
  { path: 'view-staff', component: ViewStaffsComponent },
  { path: 'reports', component: ReportsComponent },

  // 👷 Staff Dashboard
  { path: 'staff-dashboard', component: StaffDashboardComponent },
  { path: 'scan-qr', component: ScanProductComponent },
  {path:'view-low-stock',component: ViewLowStockComponent },
  {path:'assign-product',component:AssignProductComponent},
    {path:'view-assigned-products',component:ViewAssignedProductsComponent},
  {path:'review-assigned-product',component:ReviewAssignedProductComponent},

  // 📦 Standalone Lazy-Loaded Components
  {
    path: 'view-product',
    loadComponent: () =>
      import('./pages/view-product/view-product.component')
        .then(m => m.ViewProductComponent)
  },
  {
    path: 'update-product/:id',
    loadComponent: () =>
      import('./pages/update-product/update-product.component')
        .then(m => m.UpdateProductComponent)
  },

  // 🏠 Default Route
  { path: '', redirectTo: 'view-stock', pathMatch: 'full' },

  // ❌ 404 Fallback
  { path: '**', redirectTo: 'view-stock' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    AddProductComponent,
    AdminLoginComponent,
    ViewStockComponent,
    LowStockComponent,
    AddStaffsComponent,
    ViewStaffsComponent,
    StaffLoginComponent,
    StaffDashboardComponent,
    ScanProductComponent,
    ReportsComponent,
     ViewLowStockComponent,
     AssignProductComponent,
     ViewAssignedProductsComponent,
     ReviewAssignedProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
