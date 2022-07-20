import { ProColumns } from '@ant-design/pro-components';
import { getIssueType } from './api';
import { days_tocolors, status } from './enums';

export const day_calculation = (date: string | Date) => {
  const day_1 = new Date(date);
  const day_2 = new Date();
  const diff = day_2.getTime() - day_1.getTime();
  const daytotal = diff / (1000 * 60 * 60 * 24);
  return Math.floor(daytotal);
};

const color_indicator = (color: string) => {
  return (
    <span
      style={{
        display: 'block',
        width: '5px',
        height: '5px',
        backgroundColor: color,
        content: ' ',
      }}
    ></span>
  );
};

const date_render = (record: APITypes.SSHEIssueApitype) => {
  let rendered = undefined;
  days_tocolors.forEach((v) => {
    switch (v.symbols) {
      case '<':
        if (day_calculation(record.date) < v.days) {
          rendered = (
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
              {color_indicator(v.color)}
              {record.date}
            </div>
          );
        }
        break;
      case '>=':
        if (day_calculation(record.date) >= v.days) {
          rendered = (
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
              {color_indicator(v.color)}
              {record.date}
            </div>
          );
        }
        break;
      default:
        break;
    }
  });
  return rendered;
};

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
    render: (text, record: APITypes.SSHEIssueApitype) => {
      day_calculation(record.date);
      return (
        <div style={{ height: '100%' }}>
          {record.close === 0 || record.close === null ? (
            date_render(record)
          ) : (
            <span>{record.date}</span>
          )}
        </div>
      );
    },
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
