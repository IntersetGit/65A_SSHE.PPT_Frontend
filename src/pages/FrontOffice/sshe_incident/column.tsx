import { ProColumns } from '@ant-design/pro-components';

const columns: ProColumns[] = [
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

export default columns;
