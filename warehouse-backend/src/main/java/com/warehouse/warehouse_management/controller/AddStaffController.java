package com.warehouse.warehouse_management.controller;


import com.warehouse.warehouse_management.entity.AddStaffEntity;
import com.warehouse.warehouse_management.repository.AddStaffRepository;
import com.warehouse.warehouse_management.service.AddStaffService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("/api/staffs_details")
public class AddStaffController {

    @Autowired
    private AddStaffService staffService;

    @Autowired
    private AddStaffRepository staffRepository;

    // 🔸 Add new staff
    @PostMapping
    public ResponseEntity<AddStaffEntity> addStaff(@RequestBody AddStaffEntity staff) {
    	AddStaffEntity savedStaff = staffService.addStaff(staff);
        return new ResponseEntity<>(savedStaff, HttpStatus.CREATED);
    }

    // 🔸 Get all staff
    @GetMapping
    public ResponseEntity<List<AddStaffEntity>> getAllStaff() {
        return ResponseEntity.ok(staffService.getAllStaff());
    }

    // 🔸 Get staff by ID
    @GetMapping("/{id}")
    public ResponseEntity<AddStaffEntity> getStaffById(@PathVariable Long id) {
        Optional<AddStaffEntity> staffOpt = staffService.getStaffById(id);
        return staffOpt.map(ResponseEntity::ok)
                       .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // 🔸 Update staff
    @PutMapping("/{id}")
    public ResponseEntity<AddStaffEntity> updateStaff(@PathVariable Long id, @RequestBody AddStaffEntity staff) {
    	AddStaffEntity updated = staffService.updateStaff(id, staff);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    

    // 🔸 Delete staff
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable Long id) {
        staffService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 🔸 Login staff (email + password check)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        AddStaffEntity staff = staffService.login(email, password);
        if (staff != null) {
            return ResponseEntity.ok(staff); // Only return what is needed
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    // 🔸 Get staff by email (for fetching staff ID based on email)
    @GetMapping("/email/{email}")
    public ResponseEntity<AddStaffEntity> getStaffByEmail(@PathVariable String email) {
        Optional<AddStaffEntity> staff = staffRepository.findByEmail(email);
        return staff.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/count")
    public long getTotalStaff() {
        return staffRepository.count();
    }
    @GetMapping("/staffId/{staffId}")
    public ResponseEntity<AddStaffEntity> getByStaffId(@PathVariable String staffId) {
        Optional<AddStaffEntity> staff = staffRepository.findByStaffId(staffId);
        return staff.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/staff-ids")
    public List<String> getAllStaffIds() {
        return staffRepository.findAll()
                .stream()
                .map(AddStaffEntity::getStaffId)
                .toList();
    }
    
    @GetMapping("/by-staff-id/{staffId}")
    public ResponseEntity<AddStaffEntity> getStaffByStaffId(@PathVariable String staffId) {
        Optional<AddStaffEntity> staffOpt = staffRepository.findByStaffId(staffId);
        return staffOpt.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }

 // 🔸 Update basic profile (for logged-in staff)
    @PutMapping("/update-profile/{id}")
    public ResponseEntity<AddStaffEntity> updateProfile(@PathVariable Long id, @RequestBody AddStaffEntity profileData) {
        try {
            AddStaffEntity updated = staffService.updateStaffProfile(id, profileData);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    


} 
