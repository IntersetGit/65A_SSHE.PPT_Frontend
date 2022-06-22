import { ProColumns } from '@ant-design/pro-components';

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
  },
  {
    title: 'Hazard',
    key: 'hazard',
  },
  {
    title: 'Description',
    key: 'description',
  },
  {
    title: 'Suggestion',
    key: 'suggestion',
  },
];
