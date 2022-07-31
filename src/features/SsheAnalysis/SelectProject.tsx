import { Select } from 'antd';
import { Fragment } from 'react';

const SelectProject = () => {
  const { Option } = Select;

  return (
    <Fragment>
      <Select allowClear placeholder="Select Project" style={{ width: 200 }}>
        <Option value="lucy1">data1</Option>
        <Option value="lucy2">data2</Option>
        <Option value="lucy3">data3</Option>
      </Select>
    </Fragment>
  );
};

export default SelectProject;
