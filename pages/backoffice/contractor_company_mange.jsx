import { Card , Space , Table , Tag } from 'antd';

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
    title: 'สถานะ',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'การกระทำ',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <p>Invite {record.name}</p>
        <p>Delete</p>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const ContractorCompanyManage = () =>{

  return (
    <>
      <Card bordered={true}>
        <p>ฟิลเตอร์ค้นหาบริษัท</p>
      </Card>
      <Card style={{ marginTop : '1rem' }} bordered={true}>
        <Table columns={columns} dataSource={data} />
      </Card>
    </>
  )

}

export default ContractorCompanyManage