import { ProColumns } from '@ant-design/pro-components';
import { getIssueType } from './api';
import { status } from './enums';

export const columns: ProColumns[] = [
  {
    title: 'Form - To Date',
    key: 'date',
    valueType: 'dateRange',
    hideInForm: true,
    hideInTable: true,
  },
  {
    title: 'Date',
    key: 'date',
    dataIndex: 'date',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: 'Location',
    key: 'location',
    dataIndex: 'location',
    hideInSearch: true,
  },
  {
    title: 'Primary Case',
    key: 'primary_case',
    dataIndex: 'issue_type_name',
    valueType: 'select',
    request: async () => {
      return getIssueType();
    },
  },
  {
    title: 'Process',
    key: 'status',
    dataIndex: 'status',
    valueType: 'select',
    hideInTable: true,
    request: async () => {
      return status;
    },
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
    dataIndex: 'hazard_name',
    hideInSearch: true,
  },
  {
    title: 'Description',
    key: 'description',
    dataIndex: 'description',
    hideInSearch: true,
  },
  {
    title: 'Suggestion',
    key: 'suggestion',
    dataIndex: 'suggestion',
    hideInSearch: true,
  },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   valueType: 'option',
  //   hideInSearch: true,
  //   render: (_, record) => {
  //     return (
  //       <>
  //         <Dropdown.Button type='text' icon={<MoreOutlined />} overlay={<DropdownMenu record={record}/>}/>
  //       </>
  //     );
  //   }
  // },
];
