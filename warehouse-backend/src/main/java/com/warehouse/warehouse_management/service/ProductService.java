package com.warehouse.warehouse_management.service;

import com.warehouse.warehouse_management.entity.ProductEntity;
import com.warehouse.warehouse_management.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ProductEntity saveProduct(
            String name, String category, String brand, int quantity, double price,
            String location, String description, MultipartFile image1,
            MultipartFile image2, MultipartFile image3, String qrCodeBase64
    ) {
        try {
            ProductEntity product = new ProductEntity();
            product.setName(name);
            product.setCategory(category);
            product.setBrand(brand);
            product.setQuantity(quantity);
            product.setPrice(price);
            product.setLocation(location);
            product.setDescription(description);
            if (image1 != null && !image1.isEmpty()) product.setImage1(image1.getBytes());
            if (image2 != null && !image2.isEmpty()) product.setImage2(image2.getBytes());
            if (image3 != null && !image3.isEmpty()) product.setImage3(image3.getBytes());
            product.setQrCode(qrCodeBase64);
            product.setDateAdded(LocalDate.now());

            String productCode = generateProductCode(category, brand);
            product.setProductCode(productCode);

            return productRepository.save(product);

        } catch (IOException e) {
            throw new RuntimeException("Error reading image files", e);
        }
    }

    public String generateProductCode(String category, String brand) {
        String catCode = switch (category.trim().toLowerCase()) {
            case "electronics" -> "ELEC";
            case "furniture" -> "FURN";
            case "clothes", "clothing" -> "CLTH";
            default -> category.substring(0, Math.min(4, category.length())).toUpperCase();
        };

        String brandCode = brand.length() >= 3
                ? brand.substring(0, 3).toUpperCase()
                : String.format("%-3s", brand).replace(' ', '_').toUpperCase();

        String prefix = catCode + "-" + brandCode;
        long count = productRepository.countByProductCodeStartingWith(prefix);
        String number = String.format("%03d", count + 1);

        return prefix + "-" + number;
    }

    public String previewGeneratedProductCode(String category, String brand) {
        return generateProductCode(category, brand);
    }

    public ProductEntity getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    public ProductEntity updateProduct(Long id, ProductEntity productData) {
        ProductEntity existing = getProductById(id);

        existing.setName(productData.getName());
        existing.setCategory(productData.getCategory());
        existing.setBrand(productData.getBrand());
        existing.setQuantity(productData.getQuantity());
        existing.setPrice(productData.getPrice());
        existing.setLocation(productData.getLocation());
        existing.setDescription(productData.getDescription());

        return productRepository.save(existing);
    }

    public void updateQRCode(Long id, String qrCodeBase64) {
        ProductEntity product = getProductById(id);
        product.setQrCode(qrCodeBase64);
        productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    public ProductEntity updateProductWithImages(
            Long id, String name, String category, String brand, int quantity,
            double price, String location, String description,
            MultipartFile image1, MultipartFile image2, MultipartFile image3
    ) {
        try {
            ProductEntity product = getProductById(id);

            product.setName(name);
            product.setCategory(category);
            product.setBrand(brand);
            product.setQuantity(quantity);
            product.setPrice(price);
            product.setLocation(location);
            product.setDescription(description);

            if (image1 != null && !image1.isEmpty()) {
                product.setImage1(image1.getBytes());
            }
            if (image2 != null && !image2.isEmpty()) {
                product.setImage2(image2.getBytes());
            }
            if (image3 != null && !image3.isEmpty()) {
                product.setImage3(image3.getBytes());
            }

            return productRepository.save(product);

        } catch (IOException e) {
            throw new RuntimeException("Error updating product with images", e);
        }
    }
    public long getTotalProductCount() {
        return productRepository.count();
    }

    public int getTotalStockQuantity() {
        return productRepository.findAll()
                .stream()
                .mapToInt(ProductEntity::getQuantity)
                .sum();
    }

    public long getLowStockCount(int threshold) {
        return productRepository.findAll()
                .stream()
                .filter(p -> p.getQuantity() < threshold)
                .count();
    }

}
