import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Menu, Row } from 'antd';

const UserProfile: React.FC = () => {
  const menues = [
    {
      label: 'Personal Info',
      key: 'personal-info',
      icon: <UserOutlined />,
    },
    {
      label: 'Change Password',
      key: 'change-password',
      icon: <LockOutlined />,
    },
  ];
  return (
    <>
      <Row gutter={[24, 16]}>
        <Col span={24} sm={24} xl={6}>
          <Card bordered size="small">
            <Menu items={menues} defaultSelectedKeys={['personal-info']} />
          </Card>
        </Col>
        <Col span={24} xl={15}>
          <Card>
            <p>Personal Info</p>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UserProfile;
