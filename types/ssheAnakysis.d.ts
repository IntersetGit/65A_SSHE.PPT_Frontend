declare namespace AnalysisT {
  type UnsafeIssueT = {
    items: UnsafeIssueDataT;
    status_code: number;
  };
}

type UnsafeIssueDataT = {
  issue_type_name: string;
  quantity: number;
}[];
