import { ProColumns } from '@ant-design/pro-components';

export const columns: ProColumns[] = [
  {
    title: 'ลำดับ',
    dataIndex: 'number',
    key: 'number',
    align: 'center',
    sorter: (a, b) => a.number - b.number,
    hideInSearch: true,
  },
  {
    title: 'ชื่อ-สกุล',
    dataIndex: 'firstlast',
    key: 'firstlast',
    align: 'center',
  },
  {
    title: 'ตำแหน่ง',
    dataIndex: 'position',
    key: 'position',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: 'Project ที่รับผิดชอบ',
    dataIndex: 'project_responsible',
    key: 'project_responsible',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: 'สถานะ',
    dataIndex: 'isuse',
    key: 'isuse',
    align: 'center',
    sorter: (a, b) => a.isuse - b.isuse,
    render: (record) => {
      return <p>{record === 1 ? `ใช้งาน` : `ไม่ใช้งาน`}</p>;
    },
  },
];
