package com.warehouse.warehouse_management.controller;

import com.warehouse.warehouse_management.dto.AssignProductRequest;
import com.warehouse.warehouse_management.entity.AssignedProductEntity;
import com.warehouse.warehouse_management.service.AssignedProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assigned-products")
@CrossOrigin(origins = "http://localhost:4200")
public class AssignedProductController {

    @Autowired
    private AssignedProductService assignedProductService;

    @PostMapping("/assign")
    public String assignProducts(@RequestBody AssignProductRequest request) {
        assignedProductService.assignProductsToStaff(request);
        return "Products assigned successfully";
    }

    @GetMapping("/all")
    public List<AssignedProductEntity> getAllAssignedProducts() {
        return assignedProductService.getAllAssignedProducts();
    }

    @DeleteMapping("/{id}")
    public String unassignProduct(@PathVariable Long id) {
        assignedProductService.unassignProduct(id);
        return "Unassigned successfully";
    }
    
    @GetMapping("/{staffId}")
    public List<AssignedProductEntity> getAssignedProductsByStaffId(@PathVariable String staffId) {
        return assignedProductService.getAssignedProductsByStaffId(staffId);
    }
}
