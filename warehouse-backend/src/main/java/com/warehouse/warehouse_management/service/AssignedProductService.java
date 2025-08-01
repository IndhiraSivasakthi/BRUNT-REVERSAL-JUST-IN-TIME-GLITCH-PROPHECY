package com.warehouse.warehouse_management.service;

import com.warehouse.warehouse_management.dto.AssignProductRequest;
import com.warehouse.warehouse_management.entity.AssignedProductEntity;
import com.warehouse.warehouse_management.repository.AssignedProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignedProductService {

    @Autowired
    private AssignedProductRepository assignedProductRepository;

    public void assignProductsToStaff(AssignProductRequest request) {
        String staffId = request.getStaffId();
        List<String> products = request.getProducts();

        for (String product : products) {
            AssignedProductEntity assignedProduct = new AssignedProductEntity(staffId, product);
            assignedProductRepository.save(assignedProduct);
        }
    }

    public List<AssignedProductEntity> getAllAssignedProducts() {
        return assignedProductRepository.findAll();
    }

    public void unassignProduct(Long id) {
        assignedProductRepository.deleteById(id);
    }
    public List<AssignedProductEntity> getAssignedProductsByStaffId(String staffId) {
        return assignedProductRepository.findByStaffId(staffId);
    }

    
}
