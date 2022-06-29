import { Card, Result } from 'antd';

const UnderMaintenance: React.FC = () => {
  return (
    <Card>
      <Result
        status="info"
        title="UNDER MAINTENANCE"
        subTitle="This page is under maintenance please try again later."
      />
    </Card>
  );
};

export default UnderMaintenance;
