import React, { useState , useEffect } from 'react'
import { Card , Space , Table , Tag, Dropdown, Button, Menu } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import LocationDrawer from '../../components/Drawers/location_drawer';
import { dataz } from '../../config/data_company';

const ContractorCompanyManage = (props) => {
  const [comusermanage,setcomusermanage] = useState(dataz);

    const AddComData = (type, _data) => {
      console.log('onSaveData')
      switch (type) {
        case "ADD":
          console.log([...comusermanage, {key : comusermanage.length + 1 , ..._data}])
          setcomusermanage([...comusermanage, {key :adusermanage.length + 1 , ..._data}])
          break;

        case "UPDATE":
          const indexs = comusermanage.findIndex(e => e.id == _data.id)
          let arr = [...comusermanage]
          
          arr[indexs] = _data

          setcomusermanage(arr)
          break;

        case "DELETE":
          console.log(_data)
          const newState = [...comusermanage]
          const newArr = newState.filter(e => e.key != _data)

          setcomusermanage(newArr)
          break;

        default:
          break;
      }
    }


  const columns = [
    {
      title: 'รหัสบริษัท',
      dataIndex: 'reg_company_id',
      key: 'reg_company_id',
    },
    {
      title: 'ชื่อบริษัท',
      dataIndex: 'company_name_th',
      key: 'company_name_th',
      render: text => <p>{text}</p>,
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'village_building_th',
      key: 'village_building_th',
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.type - b.type,
      render: (record) => {
        return <p style={{ backgroundColor: record ? '#6CFF60' : '#FF6060', textAlign: 'center', borderRadius: '10px', color: 'white' }}>{record ? "ใช้งาน" : "ไม่ได้ใช้งาน"}</p>;
      },
    },
    {
      title: 'จัดการ',
      key: 'จัดการ',
      render: (record) => {
        return (<LocationDrawer data={record} type={2} onSave={AddComData} /> )
      }
    }
  ];

  return (
    <>
      <Card bordered={true}>
        <p>ฟิลเตอร์ค้นหาบริษัท</p>
      </Card>
      <Card style={{ marginTop : '1rem' }} bordered={true}>
      <LocationDrawer type={1} onSave={AddComData} />
        <Table columns={columns} dataSource={comusermanage} expandable size={'middle'} />
      </Card>
    </>
  )

}

export default ContractorCompanyManage