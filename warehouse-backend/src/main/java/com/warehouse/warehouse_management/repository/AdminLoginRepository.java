package com.warehouse.warehouse_management.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.warehouse.warehouse_management.entity.AdminLoginEntity;

public interface AdminLoginRepository extends JpaRepository<AdminLoginEntity, Long> {
    Optional<AdminLoginEntity> findTopByUsernameOrderByLoginTimeDesc(String username);
}
