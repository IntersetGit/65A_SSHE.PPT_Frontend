import { ProTable } from '@ant-design/pro-components';
import { columns } from './column';
import { simple_data } from './simple_data';

const RiskIdenTemPlate: React.FC = () => {
  const onExpand = (
    expanded: boolean,
    record: APITypes.RiskIdentifierTemplateType,
  ) => {
    console.log(expanded, record);
  };
  return (
    <>
      <ProTable<APITypes.RiskIdentifierTemplateType>
        headerTitle="Risk Identification Template Data"
        bordered
        size="small"
        scroll={{ x: 1500, y: 600 }}
        columns={columns}
        request={async () => ({
          data: simple_data,
          total: simple_data.length,
          success: true,
        })}
        expandable={{
          // expandedRowRender: (record) => <p>{JSON.stringify(record.hazard)}</p>,
          // rowExpandable: (record) => true,
          onExpand,
        }}
      />
    </>
  );
};

export default RiskIdenTemPlate;
