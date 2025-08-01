package com.warehouse.warehouse_management.service;

import com.warehouse.warehouse_management.entity.AdminLoginEntity;

public interface AdminLoginService {
    AdminLoginEntity saveLogin(AdminLoginEntity adminLoginEntity);
    void updateLogoutTime(Long id);
}
