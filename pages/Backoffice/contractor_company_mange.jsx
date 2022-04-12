import { Card , Space , Table , Tag, Dropdown, Button, Menu } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import LocationDrawer from '../../components/Drawers/location_drawer';

const columns = [
  {
    title: 'รหัสบริษัท',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'ชื่อบริษัท',
    dataIndex: 'name',
    key: 'name',
    render: text => <p>{text}</p>,
  },
  {
    title: 'ที่อยู่',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: "สถานะ",
    dataIndex: "tag",
    key: "tag",
    sorter: (a, b) => a.type - b.type,
    render: (record) => {
      return <p style={{ backgroundColor: record ? '#6CFF60' : '#FF6060', textAlign: 'center', borderRadius: '10px', color: 'white' }}>{record ? "ใช้งาน" : "ไม่ได้ใช้งาน"}</p>;
    },
  },
  {
    title: 'จัดการ',
    key: 'จัดการ',
    render: (record) => {
      return (<Dropdown.Button icon={<MoreOutlined />} type="text"
                  overlay={<Menu mode="vertical">
                  <Menu.Item key="1" icon={<EditOutlined />}>แก้ไขข้อมูลบริษัท</Menu.Item>
                  <Menu.Item key="2" icon={<DeleteOutlined />}>ลบข้อมูลบริษัท</Menu.Item>
                  </Menu>}
              >
              </Dropdown.Button>)
              },
  }
];

const data = [
  {
    key: '1',
    name: 'Interset',
    age: 10,
    address: 'Elephet Tower',
    tags: 'ใช้งาน',
  },
  {
    key: '2',
    name: 'PTT GROUP',
    age: 20,
    address: 'Ratchada',
    tags: 'ไม่ได้ใช้งาน',
  },
  {
    key: '3',
    name: 'BMW',
    age: 30,
    address: 'Ratchada',
    tags: 'ใช้งาน',
  },
];

const ContractorCompanyManage = () =>{

  return (
    <>
      <Card bordered={true}>
        <p>ฟิลเตอร์ค้นหาบริษัท</p>
      </Card>
      <Card style={{ marginTop : '1rem' }} bordered={true}>
      <LocationDrawer />
        <Table columns={columns} dataSource={data} expandable size={'middle'} />
      </Card>
    </>
  )

}

export default ContractorCompanyManage