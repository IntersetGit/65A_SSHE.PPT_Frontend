import type { BasicLayoutProps as ProLayoutProps,  MenuDataItem,  Settings  } from "@ant-design/pro-layout"
import {PageContainer , ProLayout } from "@ant-design/pro-layout"
import type { MenuProps } from "antd"
import React from "react"
import { Link , history  } from "umi"
import defaultSettings from "../../config/defaultSettings"
import HeaderTitle from "./HeaderTitle"
import ICONMAP from "@/components/Iconmap "
import Footer from "./Footer"
import RightNavContent from "./RightNavContent"
import { ConfigProvider } from "antd";
import enUS from 'antd/lib/locale/en_US';

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

const BasicLayout: React.FC<BasicLayoutProps> = (props) =>{
  const [isCollapsed ,setCollased] = React.useState<boolean>(false)
  const {
    children , 
    location = {
      pathname: '/'
    }
  } = props

  const MenuPropsSettings: MenuProps = {
    mode : 'inline',
    style : {
      backgroundImage : `url(${location.pathname.split('/')[1] === 'frontoffice' ? '/assets/frontoficebg.png' : '/assets/bg-section-3-black.png' })`,
      backgroundRepeat : 'no-repeat',
      backgroundSize : 'cover',
      backgroundPosition : 'center',
      fontSize : '1rem',
      color: 'white'
    },
    inlineIndent : 15
  }

  const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    // console.log(item)
    return {
      ...item,
      icon : item.icon && ICONMAP[item.icon as string],
      children: item.children ? menuDataRender(item.children) : undefined,
    };
  });

  // console.log(location.pathname.split('/')[1])
  return (
    <ProLayout
      {...defaultSettings}
      {...props} 
      collapsed={isCollapsed}
      onCollapse={(iscollaped) =>{
        setCollased(iscollaped)
      }}
      rightContentRender={() => <RightNavContent/>}
      onMenuHeaderClick={() => history.push('/')}
      breadcrumbRender={(routers = []) => [
        ...routers,
      ]}
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
        //console.log('menuItemProps =>',menuItemProps,'\ndefaultDom =>',defaultDom)
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return <>{menuItemProps.icon} {menuItemProps.name}</>;
        }
        return <><Link to={menuItemProps.path}>{menuItemProps.icon} { menuItemProps.name}</Link></>;
      }}
      menuDataRender={menuDataRender}
      disableContentMargin
      // @ts-ignore: Unreachable code error
      headerTitleRender={(logo: string  , title: string , props : BasicLayoutProps ) => <HeaderTitle logo={logo} title={title} props={props}/>}
      menuProps={MenuPropsSettings}
      footerRender={() => <Footer/>}
    >
      <PageContainer>
        <ConfigProvider locale={enUS}>
          {children}
        </ConfigProvider>
      </PageContainer>
    </ProLayout>
  )
}

export default BasicLayout