package com.warehouse.warehouse_management.repository;

import com.warehouse.warehouse_management.entity.StaffLoginEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StaffLoginRepository extends JpaRepository<StaffLoginEntity, Long> {
    Optional<StaffLoginEntity> findTopByEmailOrderByLoginTimeDesc(String email);
}
