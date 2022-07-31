import { request } from 'umi';

export default async function getUnsafeIssue(param?: string) {
  const response = (await request(
    `ssheissue/summary/unsafe${param || ''}`,
  )) as AnalysisT.UnsafeIssueT;
  if (response.status_code !== 200)
    throw new Error('The server is down, please contact the administrator.');
  return response;
}
