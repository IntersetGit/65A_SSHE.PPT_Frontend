import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';
import { columns } from './column';

const Issue = () => {
  const [isShowDrawer, setShowDrawer] = useState(false);

  const showModal = () => {
    setShowDrawer(true);
  };

  return (
    <>
      <ProTable
        search={{
          labelWidth: 'auto',
        }}
        columns={columns}
        toolBarRender={() => [
          <Button
            type="primary"
            style={{ float: 'right' }}
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            เพิ่ม
          </Button>,
        ]}
        size={'middle'}
        scroll={{
          y: 240,
        }}
      />
    </>
  );
};

export default Issue;
