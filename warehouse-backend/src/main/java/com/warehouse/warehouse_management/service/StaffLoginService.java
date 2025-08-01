package com.warehouse.warehouse_management.service;

import com.warehouse.warehouse_management.entity.StaffLoginEntity;
import com.warehouse.warehouse_management.repository.StaffLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class StaffLoginService {

    @Autowired
    private StaffLoginRepository staffLoginRepository;

    // 🔹 Insert login record
    public StaffLoginEntity insertLogin(String staffId, String email) {
        StaffLoginEntity login = new StaffLoginEntity();
        login.setStaffId(staffId);
        login.setEmail(email);
        login.setLoginTime(LocalDateTime.now());
        login.setLogoutTime(null);
        return staffLoginRepository.save(login);
    }

    // 🔹 Update logout time for latest login by email
    public void updateLogoutTime(String email) {
        Optional<StaffLoginEntity> latestLogin = staffLoginRepository.findTopByEmailOrderByLoginTimeDesc(email);
        latestLogin.ifPresent(login -> {
            login.setLogoutTime(LocalDateTime.now());
            staffLoginRepository.save(login);
        });
    }
}
