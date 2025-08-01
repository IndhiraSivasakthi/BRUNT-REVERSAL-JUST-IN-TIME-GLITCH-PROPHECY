package com.warehouse.warehouse_management.controller;

import com.warehouse.warehouse_management.dto.QRCodeDTO;
import com.warehouse.warehouse_management.entity.ProductEntity;
import com.warehouse.warehouse_management.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductService productService;

    // ✅ Add Product
    @PostMapping
    public ResponseEntity<ProductEntity> addProduct(
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("brand") String brand,
            @RequestParam("quantity") int quantity,
            @RequestParam("price") double price,
            @RequestParam("location") String location,
            @RequestParam("description") String description,
            @RequestParam("image1") MultipartFile image1,
            @RequestParam("image2") MultipartFile image2,
            @RequestParam("image3") MultipartFile image3,
            @RequestParam("qrCode") String qrCodeBase64
    ) {
        ProductEntity product = productService.saveProduct(
                name, category, brand, quantity, price, location,
                description, image1, image2, image3, qrCodeBase64
        );
        return ResponseEntity.status(201).body(product);
    }

    // ✅ Get All Products
    @GetMapping
    public ResponseEntity<List<ProductEntity>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // ✅ Get Product by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductEntity> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    // ✅ Preview SKU/Code
    @GetMapping("/generate-code")
    public ResponseEntity<String> previewProductCode(
            @RequestParam String category,
            @RequestParam String brand
    ) {
        return ResponseEntity.ok(productService.previewGeneratedProductCode(category, brand));
    }

    // ✅ Update Product (without images)
    @PutMapping("/{id}")
    public ResponseEntity<ProductEntity> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductEntity updatedProduct
    ) {
        return ResponseEntity.ok(productService.updateProduct(id, updatedProduct));
    }

    // ✅ Update QR Code
    @PostMapping("/{id}/qr-code")
    public ResponseEntity<Void> updateQRCode(@PathVariable Long id, @RequestBody QRCodeDTO qrCodeDto) {
        productService.updateQRCode(id, qrCodeDto.getQrCode());
        return ResponseEntity.ok().build();
    }

    // ✅ Delete Product
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Update with new images
    @PutMapping("/{id}/update-with-images")
    public ResponseEntity<ProductEntity> updateProductWithImages(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("brand") String brand,
            @RequestParam("quantity") int quantity,
            @RequestParam("price") double price,
            @RequestParam("location") String location,
            @RequestParam("description") String description,
            @RequestParam(value = "image1", required = false) MultipartFile image1,
            @RequestParam(value = "image2", required = false) MultipartFile image2,
            @RequestParam(value = "image3", required = false) MultipartFile image3
    ) {
        return ResponseEntity.ok(
                productService.updateProductWithImages(
                        id, name, category, brand, quantity, price,
                        location, description, image1, image2, image3
                )
        );
    }

    // ✅ Dashboard Stats
    @GetMapping("/count")
    public long getTotalProducts() {
        return productService.getTotalProductCount();
    }

    @GetMapping("/total-stock")
    public int getTotalStock() {
        return productService.getTotalStockQuantity();
    }

    @GetMapping("/low-stock")
    public long getLowStock(@RequestParam(defaultValue = "10") int threshold) {
        return productService.getLowStockCount(threshold);
    }
 // ✅ Endpoint: Get all product names
    @GetMapping("/names")
    public List<String> getAllProductNames() {
        return productService.getAllProducts()
                .stream()
                .map(ProductEntity::getName)
                .toList();
    }

}

