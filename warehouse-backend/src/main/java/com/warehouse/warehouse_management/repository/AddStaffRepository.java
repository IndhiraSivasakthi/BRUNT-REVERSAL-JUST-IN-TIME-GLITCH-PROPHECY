package com.warehouse.warehouse_management.repository;


import com.warehouse.warehouse_management.entity.AddStaffEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddStaffRepository extends JpaRepository<AddStaffEntity, Long> {
    Optional<AddStaffEntity> findByEmail(String email);
    Optional<AddStaffEntity> findByStaffId(String staffId);


    boolean existsByEmail(String email);

} 