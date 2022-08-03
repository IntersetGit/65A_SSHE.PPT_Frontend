declare namespace AnalysisT {
  type findAllIssueT = {
    readonly items: IssueDataT;
    readonly status_code: number;
  };
  type UnsafeIssueT = {
    readonly items: UnsafeIssueDataT;
    readonly status_code: number;
  };
  type SummaryIssueT = {
    readonly items: SummaryIssueDataT;
    readonly status_code: number;
  };
  type SummaryIssueTop5T = {
    readonly items: SummaryIssueDataTop5T;
    readonly status_code: number;
  };
}

type IssueDataT = {
  id: string;
  location: string;
}[];

type UnsafeIssueDataT = {
  issue_type_name: string;
  quantity: number;
}[];

type SummaryIssueDataT = {
  hazard_name: string;
  quantity: number;
}[];

type SummaryIssueDataTop5T = {
  task_location: string;
  quantity: number;
}[];
