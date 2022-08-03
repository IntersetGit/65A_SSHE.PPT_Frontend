import { request } from 'umi';

export async function getNameIssue() {
  const response = (await request(
    'ssheissue/find/nameissue',
  )) as AnalysisT.findAllIssueT;
  if (response.status_code !== 200)
    throw new Error('The server is down, please contact the administrator.');
  return response;
}

export async function getUnsafeIssue(param?: string) {
  const response = (await request(
    `ssheissue/summary/unsafe${param || ''}`,
  )) as AnalysisT.UnsafeIssueT;
  if (response.status_code !== 200)
    throw new Error('The server is down, please contact the administrator.');
  return response;
}

export async function getSummaryIssue(param?: string) {
  const response = (await request(
    `ssheissue/summary/environmental${param || ''}`,
  )) as AnalysisT.SummaryIssueT;
  if (response.status_code !== 200)
    throw new Error('The server is down, please contact the administrator.');
  return response;
}

export async function getSummayIssueTop5(param?: string) {
  const response = (await request(
    `ssheissue/summary/issue${param || ''}`,
  )) as AnalysisT.SummaryIssueTop5T;
  if (response.status_code !== 200)
    throw new Error('The server is down, please contact the administrator.');
  return response;
}
