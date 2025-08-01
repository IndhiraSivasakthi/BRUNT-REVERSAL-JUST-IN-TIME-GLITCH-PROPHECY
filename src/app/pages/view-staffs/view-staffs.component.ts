import { Component, OnInit } from '@angular/core';
import { Staff, StaffService } from '../../services/staff.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-staffs',
  templateUrl: './view-staffs.component.html',
  styleUrls: ['./view-staffs.component.css'],
    imports: [CommonModule, FormsModule, RouterModule],

})
export class ViewStaffsComponent implements OnInit {
  staffList: Staff[] = [];
  filteredStaff: Staff[] = [];
  selectedStaff: Staff | null = null;
  searchTerm: string = '';

  showDetailsModal = false;
  showUpdateModal = false;
  updatedStaff!: Staff;

  constructor(private staffService: StaffService) {}

  ngOnInit() {
    this.refreshStaffList();
  }

  refreshStaffList() {
    this.staffService.getAllStaff().subscribe((res) => {
      this.staffList = res;
      this.filteredStaff = res;
    });
  }

  filterStaffs() {
    const term = this.searchTerm.toLowerCase();
    this.filteredStaff = this.staffList.filter((staff) =>
      staff.fullName.toLowerCase().includes(term) ||
      staff.email.toLowerCase().includes(term)
    );
  }

  deleteStaff(id: number) {
    if (confirm('Are you sure you want to delete this staff?')) {
      this.staffService.deleteStaff(id).subscribe(() => {
        alert('🗑️ Staff deleted');
        this.refreshStaffList();
      });
    }
  }

  openDetailsModal(staff: Staff) {
    this.selectedStaff = staff;
    this.showDetailsModal = true;
  }

  closeDetailsModal() {
    this.selectedStaff = null;
    this.showDetailsModal = false;
  }

  openUpdateModal(staff: Staff) {
    this.updatedStaff = { ...staff };
    this.showUpdateModal = true;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
  }

  saveUpdatedStaff() {
    if (this.updatedStaff.id) {
      this.staffService.updateStaff(this.updatedStaff.id, this.updatedStaff).subscribe(() => {
        alert('✅ Staff updated successfully');
        this.closeUpdateModal();
        this.refreshStaffList();
      });
    }
  }
}
