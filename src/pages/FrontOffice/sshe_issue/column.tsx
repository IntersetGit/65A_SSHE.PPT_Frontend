import { ProColumns } from '@ant-design/pro-components';
import { getIssueType } from './api';

export const columns: ProColumns[] = [
  {
    title: 'Date',
    key: 'date',
    valueType: 'dateRange',
  },
  {
    title: 'Location',
    key: 'location',
    hideInSearch: true,
  },
  {
    title: 'Primary Case',
    key: 'primary_case',
    valueType: 'select',
    request: async () => {
      return getIssueType();
    },
  },
  {
    title: 'Process',
    key: 'process',
    valueType: 'select',
    hideInTable: true,
  },
  {
    title: 'Project Name',
    key: 'project_name',
    valueType: 'select',
    hideInTable: true,
  },
  {
    title: 'Hazard',
    key: 'hazard',
    hideInSearch: true,
  },
  {
    title: 'Description',
    key: 'description',
    hideInSearch: true,
  },
  {
    title: 'Suggestion',
    key: 'suggestion',
    hideInSearch: true,
  },
  {
    title: 'Action',
    key: 'action',
    valueType: 'option',
    hideInSearch: true,
  },
];
