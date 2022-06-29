import ICONMAP from '@/components/Iconmap ';
import PageMiddleware from '@/components/PageMiddleware';
import type {
  BasicLayoutProps as ProLayoutProps,
  MenuDataItem,
  Settings,
} from '@ant-design/pro-layout';
import { PageContainer, ProLayout } from '@ant-design/pro-layout';
import type { MenuProps } from 'antd';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import React from 'react';
import { history, Link, useModel } from 'umi';
import defaultSettings from '../../config/defaultSettings';
import Footer from './Footer';
import HeaderTitle from './HeaderTitle';
import RightNavContent from './RightNavContent';

const loginPath = '/login';

export type BasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
} & ProLayoutProps;

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [isCollapsed, setCollased] = React.useState<boolean>(false);
  const {
    children,
    location = {
      pathname: '/',
    },
  } = props;

  const MenuPropsSettings: MenuProps = {
    mode: 'inline',
    style: {
      backgroundImage: `url(${
        location.pathname.split('/')[1] === 'frontoffice'
          ? '/assets/frontoficebg.png'
          : '/assets/bg-section-3-black.png'
      })`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontSize: '1rem',
      color: 'white',
    },
    inlineIndent: 35,
  };

  const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
    menuList.map((item) => {
      // console.log(item)
      return {
        ...item,
        icon: item.icon && ICONMAP[item.icon as string],
        children: item.children ? menuDataRender(item.children) : undefined,
      };
    });

  // console.log(location.pathname.split('/')[1])
  return (
    <ProLayout
      {...defaultSettings}
      {...props}
      collapsed={isCollapsed}
      onCollapse={(iscollaped) => {
        setCollased(iscollaped);
      }}
      rightContentRender={() => <RightNavContent />}
      onMenuHeaderClick={() => history.push('/')}
      breadcrumbRender={(routers = []) => [...routers]}
      itemRender={(route, params, routes) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          // ใช้เปลี่ยนลิงค์ด้านหน้าเป็น Link
          //<Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          <span>{route.breadcrumbName}</span>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      menuItemRender={(menuItemProps: MenuDataItem) => {
        // DEBUG //
        // console.log('menuItemProps =>',menuItemProps)
        // if(menuItemProps.exact === false) return
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return (
            <>
              {menuItemProps.icon}{' '}
              <span style={{ marginLeft: '7px' }}>{menuItemProps.name}</span>
            </>
          );
        }
        return (
          <>
            <Link to={menuItemProps.path}>
              {menuItemProps.icon}{' '}
              <span style={{ marginLeft: '7px' }}>{menuItemProps.name}</span>
            </Link>
          </>
        );
      }}
      menuDataRender={menuDataRender}
      disableContentMargin
      onLoad={() => console.log('Onload')}
      onPageChange={(location) => {
        // เงื่อนไขหากไม่มี currentuser และ location.pathname ไม่ใช่ login path ให้เด้งไป login path
        if (!initialState?.userInfo && location.pathname !== loginPath) {
          history.push(loginPath);
        }
      }}
      // @ts-ignore: Unreachable code error
      headerTitleRender={(
        logo: string,
        title: string,
        props: BasicLayoutProps,
      ) => <HeaderTitle logo={logo} title={title} props={props} />}
      menuProps={MenuPropsSettings}
      footerRender={() => <Footer />}
    >
      <PageContainer>
        <ConfigProvider locale={enUS}>
          <PageMiddleware>{children}</PageMiddleware>
        </ConfigProvider>
      </PageContainer>
    </ProLayout>
  );
};

export default BasicLayout;
