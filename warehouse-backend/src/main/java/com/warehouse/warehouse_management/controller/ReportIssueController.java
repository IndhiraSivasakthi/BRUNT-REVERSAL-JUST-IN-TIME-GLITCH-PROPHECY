package com.warehouse.warehouse_management.controller;

import com.warehouse.warehouse_management.entity.ReportIssueEntity;
import com.warehouse.warehouse_management.service.ReportIssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:4200") // Frontend URL
public class ReportIssueController {

    @Autowired
    private ReportIssueService reportIssueService;

    // 🔘 Submit a new product issue report
    @PostMapping("/report")
    public ReportIssueEntity reportIssue(@RequestBody ReportIssueEntity issue) {
        System.out.println("📝 New issue reported by staff: " + issue.getStaffName() + " for product " + issue.getProductId());
        return reportIssueService.saveIssue(issue);  // Auto-generates reportId
    }

    // 🔘 Get all reported issues
    @GetMapping("/all")
    public List<ReportIssueEntity> getAllIssues() {
        return reportIssueService.getAllIssues();
    }

    // 🔘 Legacy: Mark as resolved using numeric ID
    @PutMapping("/resolve/{id}")
    public ReportIssueEntity resolveIssue(@PathVariable Long id) {
        ReportIssueEntity issue = reportIssueService.getIssueById(id);
        issue.setStatus("Resolved");
        issue.setResolvedAt(LocalDateTime.now());
        return reportIssueService.saveIssue(issue);
    }

    // 🔘 Update issue status using string reportId (e.g., RPT-1001)
    @PutMapping("/update-status/{reportId}")
    public ReportIssueEntity updateStatusByReportId(@PathVariable String reportId, @RequestBody Map<String, String> request) {
        String newStatus = request.get("status");
        ReportIssueEntity issue = reportIssueService.getIssueByReportId(reportId);
        issue.setStatus(newStatus);

        if ("Resolved".equalsIgnoreCase(newStatus)) {
            issue.setResolvedAt(LocalDateTime.now());
        }

        return reportIssueService.saveIssue(issue);
    }

    // 🔘 Delete issue by reportId
    @DeleteMapping("/delete/{reportId}")
    public ResponseEntity<?> deleteReportByReportId(@PathVariable String reportId) {
        try {
            ReportIssueEntity issue = reportIssueService.getIssueByReportId(reportId);
            reportIssueService.deleteIssue(issue);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
