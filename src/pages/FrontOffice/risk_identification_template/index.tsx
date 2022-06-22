import { ProTable } from '@ant-design/pro-components';
import { columns } from './column';
import { simple_data } from './simple_data';

const RiskIdenTemPlate: React.FC = () => {
  return (
    <>
      <ProTable
        headerTitle="Risk Identification Template Data"
        bordered
        size="small"
        scroll={{ x: 6200, y: 600 }}
        columns={columns}
        request={async () => ({
          data: simple_data,
          total: simple_data.length,
          success: true,
        })}
        expandable={{
          expandedRowRender: (record) => <p>{JSON.stringify(record)}</p>,
          rowExpandable: (record) => true,
        }}
      />
    </>
  );
};

export default RiskIdenTemPlate;
