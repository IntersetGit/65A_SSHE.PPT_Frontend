import React, { useState , useEffect } from 'react'
import { Card , Space , Table , Input, Dropdown, Button, Menu } from 'antd';
import LocationDrawer from './location_drawer';
import { dataz } from '../../../../dummy_data/data_company';

const { Search } = Input;

const ContractorCompanyManage = (props) => {
  const [comusermanage,setcomusermanage] = useState(dataz);

    const AddComData = (type, _data) => {
      console.log('onSaveData', type)
      switch (type) {
        case "ADD":
          console.log([...comusermanage , {id : comusermanage.length + 1 , key : comusermanage.length + 1 , reg_company_id : `Rp-00${comusermanage.length + 1}` , ..._data}])
          setcomusermanage([...comusermanage, {id : comusermanage.length + 1 , key : comusermanage.length + 1 , reg_company_id : `Rp-00${comusermanage.length + 1}`, ..._data}])
          break;

        case "UPDATE":
          const indexs = comusermanage.findIndex(e => e.key == _data.key)
          if (indexs != -1) {
            let arr = [...comusermanage]
          
            arr[indexs] = _data

            setcomusermanage(arr)
            console.log(arr)
            
          }
          break;

        case "DELETE":
          console.log(_data)
          const newState = [...comusermanage]
          const newArr = newState.filter(e => e.key != _data.key)

          setcomusermanage(newArr)
          break;

        default:
          break;
      }
    }


  const columns = [
    {
      title: 'Company ID',
      dataIndex: 'reg_company_id',
      key: 'reg_company_id',
      align: 'center'
    },
    {
      title: 'Company',
      dataIndex: 'company_name_th',
      key: 'company_name_th',
      align: 'center'
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'village_building_th',
      key: 'village_building_th',
      align: 'center'
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      align: 'center',
      sorter: (a, b) => a.type - b.type,
      render: (record) => {
        return <p>{record ? "Active" : "Non Active"}</p>;
      },
    },
    {
      title: 'จัดการ',
      key: 'จัดการ',
      align: 'center',
      render: (record) => {
        return (<LocationDrawer data={record} type={2} onSave={AddComData} /> )
      }
    }
  ];

  return (
    <>
      <Card style={{ marginTop : '1rem' }} bordered={true}>
      <h1>การจัดการข้อมูล บริษัทผู้รับเหมา</h1>
      <Space>
        <p>ชื่อโครงการ</p>
        <Search
            placeholder="Search"
            style={{ width : 300 , marginBottom : 10}}
            enterButton
        />
      </Space>
      <LocationDrawer type={1} onSave={AddComData} />
        <Table 
        columns={columns} 
        dataSource={comusermanage} 
        expandable size={'middle'}
        scroll={{
          y: 240,
        }}
        />
      </Card>
    </>
  )

}

export default ContractorCompanyManage