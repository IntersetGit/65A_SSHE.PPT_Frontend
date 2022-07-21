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

export async function getIssue(
  params: {
    // query
    /**  หน้าปัจจุบัน */
    current?: number;
    /** ขนาดของหน้า */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const result = await request<{
    items: APITypes.SSHEIssueApitype[];
    status_code: number;
  }>('ssheissue/getssheissue', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });

  if (result.items !== null) {
    result.items.forEach((v, k) => {
      v.key = k + 1;
    });
  }

  console.log(result);

  return Promise.resolve({
    data: result.items === null ? [] : result.items,
    total: result.items === null ? 0 : result.items.length,
    success: true,
  });
}

export async function addIssue(options?: { [key: string]: any }) {
  return request<APITypes.SSHEIssueFormType>('ssheissue/addssheissue', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function editIssue(options?: { [key: string]: any }) {
  return request<APITypes.SSHEIssueFormType>('ssheissue/updatedssheissue', {
    method: 'PUT',
    ...(options || {}),
  });
}

export async function deleteIssue(
  id: string,
  options?: { [key: string]: any },
) {
  return request<APITypes.SSHEIssueFormType>(
    'ssheissue/deletessheissue/' + id,
    {
      method: 'DELETE',
      ...(options || {}),
    },
  );
}

export async function getownProject(options?: { [key: string]: any }) {
  let arr: APITypes.SelectType[] = [];
  const result = await request<{
    items: { id: string; project_name: string }[];
    status_code: string | number;
  }>('master/getProjectbyid', {
    method: 'GET',
    ...(options || {}),
  });

  result.items.forEach((v, k) => {
    arr.push({ label: v.project_name, value: v.id });
  });

  return arr;
}

export async function getusersByProject(
  params: {
    // query
    /**  หน้าปัจจุบัน */
    current?: number;
    id?: string;
    /** ขนาดของหน้า */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  let arr: APITypes.SelectType[] = [];
  const result = await request<{
    items: { users: { id: string; user_name: string }[] };
    status_code: string | number;
  }>(`system/users/info/${params.id}`, {
    method: 'GET',
    // params : {
    //   ...params
    // },
    ...(options || {}),
  });

  result.items.users.forEach((v, k) => {
    arr.push({ label: v.user_name, value: v.id });
  });

  return arr;
}
