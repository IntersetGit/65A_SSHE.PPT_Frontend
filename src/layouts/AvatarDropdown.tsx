import JWTCLASS from '@/jwt';
import {
  DownOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { stringify } from 'querystring';
import { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { history, useModel } from 'umi';

const JWT = new JWTCLASS();

const AvatarDropdown: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const logOutMethod = async () => {
    const { query = {}, search, pathname } = history.location;
    const { redirect } = query;
    // Note: There may be security issues, please note

    if (window.location.pathname !== '/login' && !redirect) {
      setInitialState((s) => ({ ...s, userInfo: undefined }));

      await JWT.removeAllJWT();

      history.replace({
        pathname: '/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        logOutMethod();
      } else if (key === 'myprofile') {
        history.push('/frontoffice/user-profile');
      } else {
        history.push('/frontoffice/team-management');
      }
    },
    [setInitialState],
  );

  const menuItems = [
    {
      key: 'myprofile',
      icon: <UserOutlined />,
      label: 'My Profile',
    },
    {
      key: 'teammanage',
      icon: <TeamOutlined />,
      label: 'Team Management',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  const menu = <Menu items={menuItems} onClick={onMenuClick} />;
  return (
    <>
      <Dropdown overlay={menu}>
        <p
          style={{ textAlign: 'center', cursor: 'pointer', color: 'white' }}
          onClick={(e) => e.preventDefault()}
        >
          <UserOutlined />{' '}
          {initialState?.userInfo
            ? initialState.userInfo?.e_mail
            : 'Administrator'}{' '}
          <DownOutlined />
        </p>
      </Dropdown>
    </>
  );
};

export default AvatarDropdown;
