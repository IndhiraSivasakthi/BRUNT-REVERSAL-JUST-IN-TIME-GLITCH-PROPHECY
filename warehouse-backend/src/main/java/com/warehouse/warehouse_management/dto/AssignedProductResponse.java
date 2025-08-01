package com.warehouse.warehouse_management.dto;

public class AssignedProductResponse {
    private Long id;
    private String staffId;
    private String staffName;
    private String productName;

    public AssignedProductResponse(Long id, String staffId, String staffName, String productName) {
        this.id = id;
        this.staffId = staffId;
        this.staffName = staffName;
        this.productName = productName;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public String getStaffId() {
        return staffId;
    }

    public String getStaffName() {
        return staffName;
    }

    public String getProductName() {
        return productName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setStaffId(String staffId) {
        this.staffId = staffId;
    }

    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
}
