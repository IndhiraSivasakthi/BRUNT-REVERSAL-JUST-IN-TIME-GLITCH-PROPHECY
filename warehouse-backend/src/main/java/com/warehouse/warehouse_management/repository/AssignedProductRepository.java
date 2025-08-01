package com.warehouse.warehouse_management.repository;

import com.warehouse.warehouse_management.entity.AssignedProductEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignedProductRepository extends JpaRepository<AssignedProductEntity, Long> {
	List<AssignedProductEntity> findByStaffId(String staffId);

}
