package com.warehouse.warehouse_management.repository;

import com.warehouse.warehouse_management.entity.ReportIssueEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReportIssueRepository extends JpaRepository<ReportIssueEntity, Long> {
    Optional<ReportIssueEntity> findTopByOrderByIdDesc();          // For generating next reportId
    Optional<ReportIssueEntity> findByReportId(String reportId);   // To search using reportId
    
}
