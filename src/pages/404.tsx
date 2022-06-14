import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="ขออภัยไม่พบหน้าที่คุณต้องการ"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        กลับไปยังหน้าแรก
      </Button>
    }
  />
);

export default NoFoundPage;
