import { ProColumns } from '@ant-design/pro-components';

export const columns: ProColumns[] = [
  {
    title: 'Report No.',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Incident No.',
    dataIndex: 'incident_id',
    key: 'incident_id',
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
  },
  {
    title: 'Date of Incident',
    dataIndex: 'dateofincident',
    key: 'dateofincident',
  },
  {
    title: 'Location',
    dataIndex: 'locationofincident',
    key: 'locationofincident',
  },
  {
    title: 'Incident Type',
    dataIndex: 'typeofincident',
    key: 'typeofincident',
  },
];

export const witness_columns: ProColumns[] = [
  {
    title: 'Name',
  },
  {
    title: 'Company',
  },
  {
    title: 'Occupation/Position',
  },
];

export const corrective_columns: ProColumns[] = [
  {
    title: 'List action(s) that have or will be taken to prevent a recurrence.',
  },
  {
    title: 'Assigned To Whom',
  },
  {
    title: 'Scheduled Completion Date',
  },
  {
    title: 'Actual Completion Date',
  },
  {
    title: 'Follow-up Date',
  },
];
