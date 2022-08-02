// @ts-ignore
/* eslint-disable */

declare namespace APITypes {
  type UserInfo = {
    code_ldap?: string | undefined;
    e_mail?: string;
    first_name?: string;
    is_ad?: boolean;
    last_name?: string;
    note?: string;
    roles_id?: string;
    roles_name?: string;
    sysm_id?: string;
    user_name?: string;
  };

  type RiskRegisterType = {
    consequence: string;
    existing_control: Array<string>;
    hazard: Array<string>;
    index: number;
    initial_risk: string;
    keys: React.Key;
    likelihood: string;
    opp_threat: string;
    overall_control_effectiveness: string;
    review_comments: string;
    review_days_to_due_date: string;
    review_risk: string;
    review_risk_status: string;
    risk_action_Party: string;
    risk_consequence: string;
    risk_due_date: string;
    risk_likelihood: string;
    risk_no: number;
    risk_residual_Risk: string;
    risk_treatment_plan: string;
    work_activity: string;
  };

  type RiskIdentifierTemplateType = {
    keys: React.Key;
    key?: React.Key;
    index?: number;
    risk_no?: number;
    hazard?: string;
    existingControl?: Array<string>;
    work_activity?: string;
    children?: RiskIdentifierTemplateType[];
  };

  type IssueTypes = {
    active: number;
    created_by: string;
    created_date: Date | string;
    description: string | null;
    id: string;
    issue_type_id: string | number;
    issue_type_name: string;
    updated_by: string;
    updated_date: Date | string;
  };

  type SelectType = {
    label: string | number;
    value: string | number;
  };

  type HazardIssueType = {
    active: number;
    created_by: string;
    created_date: Date | string;
    description: string | undefined;
    hazard_id: string | undefined;
    hazard_name: string;
    id: string;
    issue_type_id: string;
    issue_type_name: string;
    updated_by: string;
    updated_date: Date | string;
  };

  type SSHEIssueApitype = {
    key?: number;
    created_by: string;
    created_date: Date | string;
    date: Date | string;
    description: string;
    due_date: Date | string;
    hazard_name: string;
    id: string;
    issue_type_name: string;
    lat: string;
    location: string;
    long: string;
    project_name: string;
    status: number;
    suggestion: string;
    updated_by: string;
    updated_date: Date | string;
    user_name: string;
    close: number;
  };

  type SSHEIssueFormType = {
    date: Date | string;
    description: string;
    due_date: Date | string;
    hazard_id: string;
    issue_type_id: string;
    lat: number;
    location: string;
    long: number;
    status: number;
    suggestion: string;
    user_id: string;
    close: number;
  };

  type TeamManagemenType = {
    key?: number;
    id: number;
    number: number;
    firstlast: string;
    position: string;
    role: string;
    isuse: number;
    e_mail: string;
    project_responsible: string;
  };
}
