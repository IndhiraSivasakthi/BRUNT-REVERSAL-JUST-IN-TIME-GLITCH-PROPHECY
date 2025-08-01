package com.warehouse.warehouse_management.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "products")
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private String brand;
    private int quantity;
    private double price;
    private String location;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    @Lob
    @Column(name = "image1", columnDefinition = "LONGBLOB")
    private byte[] image1;

    @Lob
    @Column(name = "image2", columnDefinition = "LONGBLOB")
    private byte[] image2;

    @Lob
    @Column(name = "image3", columnDefinition = "LONGBLOB")
    private byte[] image3;

    @Lob
    @Column(name = "qr_code", columnDefinition = "LONGTEXT")
    private String qrCode;

    @Column(name = "product_code", unique = true)
    private String productCode;

    @Column(name = "date_added")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateAdded;
    
   


    // ===== Getters and Setters =====

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }

    public void setCategory(String category) { this.category = category; }

    public String getBrand() { return brand; }

    public void setBrand(String brand) { this.brand = brand; }

    public int getQuantity() { return quantity; }

    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getPrice() { return price; }

    public void setPrice(double price) { this.price = price; }

    public String getLocation() { return location; }

    public void setLocation(String location) { this.location = location; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public byte[] getImage1() { return image1; }

    public void setImage1(byte[] image1) { this.image1 = image1; }

    public byte[] getImage2() { return image2; }

    public void setImage2(byte[] image2) { this.image2 = image2; }

    public byte[] getImage3() { return image3; }

    public void setImage3(byte[] image3) { this.image3 = image3; }

    public String getQrCode() { return qrCode; }

    public void setQrCode(String qrCode) { this.qrCode = qrCode; }

    public String getProductCode() { return productCode; }

    public void setProductCode(String productCode) { this.productCode = productCode; }

    public LocalDate getDateAdded() { return dateAdded; }

    public void setDateAdded(LocalDate dateAdded) { this.dateAdded = dateAdded; }
}
