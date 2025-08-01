package com.warehouse.warehouse_management.service;

import com.warehouse.warehouse_management.entity.AdminLoginEntity;
import com.warehouse.warehouse_management.repository.AdminLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AdminLoginServiceImpl implements AdminLoginService {

    @Autowired
    private AdminLoginRepository adminLoginRepository;

    @Override
    public AdminLoginEntity saveLogin(AdminLoginEntity adminLoginEntity) {
        adminLoginEntity.setLoginTime(LocalDateTime.now());
        return adminLoginRepository.save(adminLoginEntity);
    }

    @Override
    public void updateLogoutTime(Long id) {
        adminLoginRepository.findById(id).ifPresent(login -> {
            login.setLogoutTime(LocalDateTime.now());
            adminLoginRepository.save(login);
        });
    }
}
