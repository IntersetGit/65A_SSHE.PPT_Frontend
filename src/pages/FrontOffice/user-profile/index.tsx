import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Card, Col, Menu, Row, Typography } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useCallback, useState } from 'react';

const { Title } = Typography;

const UserProfile: React.FC = () => {
  const [personalinfoform] = ProForm.useForm();
  const [changepasswordform] = ProForm.useForm();
  const [currentMenu, setCurrentMenu] = useState('personal-info');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'personal-info') {
        setCurrentMenu('personal-info');
      } else if (key === 'change-password') {
        setCurrentMenu('change-password');
      }
    },
    [setCurrentMenu],
  );

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
            <Menu
              items={menues}
              onClick={onMenuClick}
              defaultSelectedKeys={[currentMenu]}
            />
          </Card>
        </Col>
        <Col span={24} xl={15}>
          {currentMenu === 'personal-info' ? (
            <Card>
              <Title level={4}>Personal Info</Title>
              <ProForm form={personalinfoform}>
                <ProForm.Group>
                  <ProFormText placeholder="Fullname" width={'lg'} />
                  <ProFormText placeholder="User name" width={'lg'} />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText placeholder="Email" width={'lg'} />
                  <ProFormText placeholder="Company" width={'lg'} />
                </ProForm.Group>
              </ProForm>
            </Card>
          ) : (
            <Card>
              <Title level={4}>Change Password</Title>
              <ProForm form={changepasswordform}>
                <ProForm.Group>
                  <ProFormText.Password
                    placeholder="Enter password"
                    width={'lg'}
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText.Password
                    placeholder="Enter new password"
                    width={'lg'}
                  />
                  <ProFormText.Password
                    placeholder="Confirm new password"
                    width={'lg'}
                  />
                </ProForm.Group>
              </ProForm>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};

export default UserProfile;
