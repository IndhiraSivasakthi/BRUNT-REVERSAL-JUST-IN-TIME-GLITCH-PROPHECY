package com.warehouse.warehouse_management.dto;

import java.util.List;

public class AssignProductRequest {
    private String staffId;
    private List<String> products;

    public String getStaffId() {
        return staffId;
    }

    public void setStaffId(String staffId) {
        this.staffId = staffId;
    }

    public List<String> getProducts() {
        return products;
    }

    public void setProducts(List<String> products) {
        this.products = products;
    }
}
