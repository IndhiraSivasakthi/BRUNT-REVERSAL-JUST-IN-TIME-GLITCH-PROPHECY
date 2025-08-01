export interface ReportIssue {
  id: number;
  reportId: string;
  productId: string;
  issueType: string;
  description: string;
  staffId: number;
  staffName: string;
  reportTime: string;
  status: string;
  resolvedAt?: string;
  notes?: string;
}
