import { ProTable } from '@ant-design/pro-components';
import { columns } from './column';

const RiskIdenTemPlate: React.FC = () => {
  return (
    <>
      <ProTable
        headerTitle="Risk Identification Template Data"
        bordered
        size="middle"
        scroll={{ x: 6200, y: 600 }}
        columns={columns}
      />
    </>
  );
};

export default RiskIdenTemPlate;
