package com.warehouse.warehouse_management.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "assigned_products")
public class AssignedProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String staffId;
    private String productName;

    public AssignedProductEntity() {}

    public AssignedProductEntity(String staffId, String productName) {
        this.staffId = staffId;
        this.productName = productName;
    }

    public Long getId() {
        return id;
    }

    public String getStaffId() {
        return staffId;
    }

    public void setStaffId(String staffId) {
        this.staffId = staffId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
}
