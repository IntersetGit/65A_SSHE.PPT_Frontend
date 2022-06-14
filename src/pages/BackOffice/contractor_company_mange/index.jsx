import { Card, Input, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi';
import { dataz } from '../../../../dummy_data/data_company';
import LocationDrawer from './location_drawer';

const { Search } = Input;

const ContractorCompanyManage = (props) => {
  const [comusermanage, setcomusermanage] = useState(dataz);

  useEffect(() => {
    request('master/getCompany', { method: 'get' }).then((res) => {
      console.log(res);
      res.items.forEach((v, k) => {
        v.key = k + 1;
      });
      setcomusermanage(res.items);
    });
  }, []);

  const AddComData = (type, _data) => {
    console.log('onSaveData', type);
    switch (type) {
      case 'ADD':
        console.log([
          ...comusermanage,
          { key: Math.floor(Math.random() * 1000), ..._data },
        ]);
        setcomusermanage([
          ...comusermanage,
          { key: Math.floor(Math.random() * 1000), ..._data },
        ]);
        break;

      case 'UPDATE':
        console.log(_data);
        const indexs = comusermanage.findIndex((e) => e.id == _data.id);
        if (indexs != -1) {
          let arr = [...comusermanage];

          arr[indexs] = _data;

          setcomusermanage(arr);
          console.log(arr);
        }
        break;

      case 'DELETE':
        console.log(_data);
        const newState = [...comusermanage];
        const newArr = newState.filter((e) => e.id != _data.id);

        setcomusermanage(newArr);
        break;

      default:
        break;
    }
  };

  const columns = [
    {
      title: 'Company ID',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
    },
    {
      title: 'Company',
      dataIndex: 'company_name',
      key: 'company_name',
      align: 'center',
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      sorter: (a, b) => a.type - b.type,
      render: (record) => {
        return <p>{record ? 'Active' : 'Non Active'}</p>;
      },
    },
    {
      title: 'จัดการ',
      key: 'จัดการ',
      align: 'center',
      render: (record) => {
        return <LocationDrawer data={record} type={2} onSave={AddComData} />;
      },
    },
  ];

  return (
    <>
      <Card style={{ marginTop: '1rem' }} bordered={true}>
        <h1>การจัดการข้อมูล บริษัทผู้รับเหมา</h1>
        <Space>
          <p>ชื่อโครงการ</p>
          <Search
            placeholder="Search"
            style={{ width: 300, marginBottom: 10 }}
            enterButton
          />
        </Space>
        <LocationDrawer type={1} onSave={AddComData} />
        <Table
          columns={columns}
          dataSource={comusermanage}
          expandable
          size={'middle'}
          scroll={{
            y: 240,
          }}
        />
      </Card>
    </>
  );
};

export default ContractorCompanyManage;
