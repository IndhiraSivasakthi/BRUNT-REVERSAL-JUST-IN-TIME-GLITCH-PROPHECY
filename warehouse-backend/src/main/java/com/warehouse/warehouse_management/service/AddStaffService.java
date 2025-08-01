package com.warehouse.warehouse_management.service;


import com.warehouse.warehouse_management.entity.AddStaffEntity;
import com.warehouse.warehouse_management.repository.AddStaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddStaffService {

    @Autowired
    private AddStaffRepository staffRepository;

    // 🔹 Add new staff
    public AddStaffEntity addStaff(AddStaffEntity staff) {
        return staffRepository.save(staff);
    }

    // 🔹 Get all staff
    public List<AddStaffEntity> getAllStaff() {
        return staffRepository.findAll();
    }

    // 🔹 Get staff by ID
    public Optional<AddStaffEntity> getStaffById(Long id) {
        return staffRepository.findById(id);
    }

    // 🔹 Update staff by ID
    public AddStaffEntity updateStaff(Long id, AddStaffEntity staff) {
        Optional<AddStaffEntity> existingOpt = staffRepository.findById(id);
        if (existingOpt.isPresent()) {
        	AddStaffEntity existing = existingOpt.get();
            existing.setFullName(staff.getFullName());
            existing.setEmail(staff.getEmail());
            existing.setPassword(staff.getPassword());
            existing.setContactNumber(staff.getContactNumber());
            existing.setRole(staff.getRole());
            existing.setNotes(staff.getNotes());
            return staffRepository.save(existing);
        }
        return null;
    }

    // 🔹 Delete staff by ID
    public void deleteById(Long id) {
        staffRepository.deleteById(id);
    }

    // 🔹 Login method (check email and password)
    public AddStaffEntity login(String email, String password) {
        Optional<AddStaffEntity> staffOpt = staffRepository.findByEmail(email);
        if (staffOpt.isPresent()) {
        	AddStaffEntity staff = staffOpt.get();
            if (staff.getPassword().equals(password)) {
                return staff;
            }
        }
        return null;
    }

    // 🔹 Check if email exists (for validations)
    public boolean emailExists(String email) {
        return staffRepository.existsByEmail(email);
    }
 // 🔹 Update basic profile info
    public AddStaffEntity updateStaffProfile(Long id, AddStaffEntity profileUpdate) {
        return staffRepository.findById(id)
            .map(existing -> {
                existing.setFullName(profileUpdate.getFullName());
                existing.setEmail(profileUpdate.getEmail());
                existing.setContactNumber(profileUpdate.getContactNumber());
                return staffRepository.save(existing);
            })
            .orElseThrow(() -> new RuntimeException("Staff not found with ID: " + id));
    }

}
