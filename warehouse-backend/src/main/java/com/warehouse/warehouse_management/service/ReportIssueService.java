package com.warehouse.warehouse_management.service;

import com.warehouse.warehouse_management.entity.ReportIssueEntity;
import com.warehouse.warehouse_management.repository.ReportIssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReportIssueService {

    @Autowired
    private ReportIssueRepository reportIssueRepository;

    // 🔘 Save new or updated issue
    public ReportIssueEntity saveIssue(ReportIssueEntity issue) {
        // Generate next report ID like RPT-1001, RPT-1002...
        if (issue.getId() == null || issue.getReportId() == null) {
            Optional<ReportIssueEntity> lastIssue = reportIssueRepository.findTopByOrderByIdDesc();

            int nextId = 1001; // Default starting point
            if (lastIssue.isPresent() && lastIssue.get().getReportId() != null) {
                String lastReportId = lastIssue.get().getReportId(); // e.g., "RPT-1005"
                try {
                    int lastNumber = Integer.parseInt(lastReportId.replace("RPT-", ""));
                    nextId = lastNumber + 1;
                } catch (NumberFormatException e) {
                    System.err.println("❌ Error parsing reportId, using default ID.");
                }
            }
            issue.setReportId("RPT-" + nextId);
        }

        return reportIssueRepository.save(issue);
    }

    // 🔘 Get all issues
    public List<ReportIssueEntity> getAllIssues() {
        return reportIssueRepository.findAll();
    }

    // 🔘 Get issue by ID
    public ReportIssueEntity getIssueById(Long id) {
        return reportIssueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("❌ Issue not found with ID: " + id));
    }
    public ReportIssueEntity getIssueByReportId(String reportId) {
        return reportIssueRepository.findByReportId(reportId)
                .orElseThrow(() -> new RuntimeException("❌ Report ID not found: " + reportId));
    }
    public void deleteIssue(ReportIssueEntity issue) {
        reportIssueRepository.delete(issue);
    }

}
