declare namespace AnalysisT {
  type UnsafeIssueT = {
    readonly items: UnsafeIssueDataT;
    readonly status_code: number;
  };
  type SummaryIssueT = {
    readonly items: SummaryIssueDataT;
    readonly status_code: number;
  };
}

type UnsafeIssueDataT = {
  issue_type_name: string;
  quantity: number;
}[];

type SummaryIssueDataT = {
  hazard_name: string;
  quantity: number;
}[];
