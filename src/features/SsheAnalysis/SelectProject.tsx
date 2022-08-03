import { getNameIssue } from '@/service/FrontoffceApi/ssheAnalysis';
import { Select } from 'antd';
import _ from 'lodash';
import { FC, Fragment, useEffect, useState } from 'react';

type SelectProjectT = {
  id: string;
  location: string;
}[];
interface SelectProjectI {
  onChange: (e: string) => void;
}

const SelectProject: FC<SelectProjectI> = ({ onChange }) => {
  const [dataSourcesIssue, setDataSourcesIssue] = useState<SelectProjectT>([]);
  const { Option } = Select;

  useEffect(() => {
    (async () => {
      const { items: responseIssueData } = await getNameIssue();
      setDataSourcesIssue(responseIssueData);
    })();
  }, []);

  return (
    <Fragment>
      <Select
        allowClear
        placeholder="Select Project"
        style={{ width: 200 }}
        onChange={onChange}
      >
        {_.size(dataSourcesIssue) > 0 &&
          dataSourcesIssue.map(({ id, location }) => (
            <Option value={id}>{location}</Option>
          ))}
      </Select>
    </Fragment>
  );
};

export default SelectProject;
