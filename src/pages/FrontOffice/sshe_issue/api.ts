// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function getIssueType(options?: { [key: string]: any }) {
  let arr: APITypes.SelectType[] = [];
  const result = await request<{
    items: APITypes.IssueTypes[];
    status_code: string | number;
  }>('master/getIssueType', {
    method: 'GET',
    ...(options || {}),
  });

  result.items.forEach((v, k) => {
    arr.push({ label: v.issue_type_name, value: v.id });
  });

  return arr;
}

export async function getIssueHazard(options?: { [key: string]: any }) {
  let arr: APITypes.SelectType[] = [];
  const result = await request<{
    items: APITypes.HazardIssueType[];
    status_code: string | number;
  }>('master/getHazardIssue', {
    method: 'GET',
    ...(options || {}),
  });

  result.items.forEach((v, k) => {
    arr.push({ label: v.hazard_name, value: v.id });
  });

  return arr;
}
