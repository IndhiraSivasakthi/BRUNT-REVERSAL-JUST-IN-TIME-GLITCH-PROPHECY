package com.warehouse.warehouse_management.repository;

import com.warehouse.warehouse_management.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    long countByProductCodeStartingWith(String prefix);
}
