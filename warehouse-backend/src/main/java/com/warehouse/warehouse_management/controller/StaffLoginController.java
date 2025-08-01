package com.warehouse.warehouse_management.controller;

import com.warehouse.warehouse_management.entity.StaffLoginEntity;
import com.warehouse.warehouse_management.service.StaffLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/staff-login")
@CrossOrigin(origins = "http://localhost:4200")
public class StaffLoginController {

    @Autowired
    private StaffLoginService staffLoginService;

    @PostMapping("/login-record")
    public ResponseEntity<StaffLoginEntity> insertLogin(@RequestBody Map<String, String> payload) {
        String staffId = payload.get("staffId");
        String email = payload.get("email");
        StaffLoginEntity login = staffLoginService.insertLogin(staffId, email);
        return ResponseEntity.ok(login);
    }

    @PutMapping("/logout-record/{email}")
    public ResponseEntity<Void> updateLogout(@PathVariable String email) {
        staffLoginService.updateLogoutTime(email);
        return ResponseEntity.ok().build();
    }
}
