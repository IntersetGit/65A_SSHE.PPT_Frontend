import { ProTable } from '@ant-design/pro-components';
import { columns } from './column';

const Issue = () => {
  return (
    <>
      <ProTable
        search={{
          labelWidth: 'auto',
        }}
        columns={columns}
      />
    </>
  );
};

export default Issue;
