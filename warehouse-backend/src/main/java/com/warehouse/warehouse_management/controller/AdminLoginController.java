package com.warehouse.warehouse_management.controller;

import com.warehouse.warehouse_management.entity.AdminLoginEntity;
import com.warehouse.warehouse_management.repository.AdminLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminLoginController {

    @Autowired
    private AdminLoginRepository loginRepository;

    // ✅ Admin login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminLoginEntity loginData) {
        if ("admin".equals(loginData.getUsername()) && "admin123".equals(loginData.getPassword())) {
            loginData.setLoginTime(LocalDateTime.now());
            loginRepository.save(loginData);
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    // ✅ Admin logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody String username) {
        // Get the most recent login entry for this user
        Optional<AdminLoginEntity> lastLoginOpt = loginRepository
                .findTopByUsernameOrderByLoginTimeDesc(username);

        if (lastLoginOpt.isPresent()) {
            AdminLoginEntity lastLogin = lastLoginOpt.get();
            lastLogin.setLogoutTime(LocalDateTime.now());
            loginRepository.save(lastLogin);
            return ResponseEntity.ok("Logout time updated");
        } else {
            return ResponseEntity.badRequest().body("No login record found for user: " + username);
        }
    }
}
