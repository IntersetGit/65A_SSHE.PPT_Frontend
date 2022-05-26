import React, { useState , useEffect } from 'react'
import { Card, Menu, Input, Dropdown, Table, Col } from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined, } from '@ant-design/icons';
import UsernonadDrawer from '../../components/Drawers/user_non_ad_drawer';
import { datas } from '../../config/data_ad';
const { Search } = Input;
const onSearch = (values,e) => {
    if (values === datas) return datas
}
const NonadUsermanage = (props) => {
    const [adusermanage,setadusermanage] = useState(datas);
    const AddAdData = (type, _data) => {
      console.log('onSaveData' , type)
      switch (type) {
        case "ADD":
          const _num = `${adusermanage.length + 1}`
          console.log([...adusermanage, {key :adusermanage.length + 1 , number : _num , is_ad : "Non-AD" , ..._data}])
          setadusermanage([...adusermanage, {key :adusermanage.length + 1 , number : _num , is_ad : "Non-AD" , ..._data}])
          break;
        case "UPDATE":
          console.log(_data , adusermanage)
          const indexs = adusermanage.findIndex(e => e.key == _data.key)
          if (indexs != -1) {
            let arr = [...adusermanage]
          
            arr[indexs] = _data
            setadusermanage(arr)
            console.log(arr)
          }
          break;
        case "DELETE":
          console.log(_data)
          const newState = [...adusermanage]
          const newArr = newState.filter(e => e.key != _data)
          setadusermanage(newArr)
          break;

          default:

          break;
        }

      }

      const columns = [
      {
        title: <b>ลำดับ</b>,
        dataIndex: 'number',
        key: 'number',
        render: (record) => {
          return (<p>{record}</p>)
        }
      },
      {
        title: <b>ชื่อเข้าใช้ระบบ</b>,
        dataIndex: 'user_name',
        key: 'user_name',
      },
      {
        title: <b>ชื่อ-นามสกุล</b>,
        dataIndex: 'firstlast',
        key: 'firstlast',
      },
      {
        title: <b>อีเมล์</b>,
        dataIndex: 'e_mail',
        key: 'e_mail',
      },
      {
        title: <b>กลุ่มผู้ใช้งาน</b>,
        dataIndex: 'roles_name',
        key: 'roles_name',
      },
      {
        title: <b>แหล่งที่มาจากผู้ใช้งาน</b>,
        dataIndex: 'is_ad',
        key: 'is_ad',
        render: (record) => {
          return (<p>{record}</p>)
        }
      },
      {
        title: <b>จัดการ</b>,
        render: (record) => {
          return (<UsernonadDrawer data={record} type={3} onSave={AddAdData} />)
      },
      }
    ];
   
    return(
      <>     
          <Card style={{ marginTop : '1rem' }} bordered={true}>
          <h1><p>จัดการผู้ใช้งานระบบ</p></h1>
          <Search
              placeholder="input search text"
              allowClear
              enterButton
              onSearch={onSearch}
              style={{ width: 400 }}
          />
          <UsernonadDrawer type={1} onSave={AddAdData} />
          <UsernonadDrawer type={2} onSave={AddAdData} />
          <Col span={24}>
            <div>
              <Table columns={columns} dataSource={adusermanage} style={{ marginTop: 20}}
              pagination={{
              }}
              />
            </div>
          </Col>
          </Card>
      </>
  )
}


export default  NonadUsermanage