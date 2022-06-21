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
}
