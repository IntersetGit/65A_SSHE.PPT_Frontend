import { Menu } from "antd";
import Icon from '@ant-design/icons';
import Link from 'next/link';

/*
* TODO: เพิ่ม path resolver สำหรับ select Menu
* */

const { SubMenu } = Menu;

const CustomMenu = ({Menuitems}) => {

  return (
    <>
      <Menu
            selectable={false}
            theme="dark"
            mode="inline"
            // defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0, fontSize: "1rem" }}
      >
        {
          Menuitems.menu.map((value,key) =>{
            return(
                value.title ?
                    <Menu.ItemGroup key={`${Menuitems.pathname}-${key}`} title={<span style={{color : '#00AEEF' , fontWeight : 'bold'}}>{value.title}</span>}>
                        {value.list.map((v , k) =>{
                            return(
                                v.type === 'menu' ?
                                    <Menu.Item key={`${k+1}`} icon={<Icon component={v.icon} />}>
                                        <Link href={`/${Menuitems.pathname}/${v.menu_name}`}>{v.title}</Link>
                                    </Menu.Item>
                                    :
                                    <SubMenu key={v.menu_name} icon={<Icon component={v.icon} />} title={v.title}>
                                        {v.menu_list.map((_v,_k) =>{
                                            return (
                                                _v.type === 'menu' &&
                                                <Menu.Item icon={<Icon component={_v.icon} />} key={`${v.menu_name}_${_k}`}><Link href={`/${Menuitems.pathname}/${_v.menu_name}`}>{_v.title}</Link></Menu.Item>
                                            )
                                        })
                                        }
                                    </SubMenu>
                            )
                        })
                        }
                    </Menu.ItemGroup>
                    :
                    <>
                        {value.list.map((v , k) =>{
                            return(
                                v.type === 'menu' ?
                                    <Menu.Item key={`${k+1}`} icon={<Icon component={v.icon} />}>
                                        <Link href={`/${Menuitems.pathname}/${v.menu_name}`}>{v.title}</Link>
                                    </Menu.Item>
                                    :
                                    <SubMenu key={v.menu_name} icon={<Icon component={v.icon} />} title={v.title}>
                                        {v.menu_list.map((_v,_k) =>{
                                            return (
                                                _v.type === 'menu' &&
                                                <Menu.Item icon={<Icon component={_v.icon} />} key={`${v.menu_name}_${_k}`}><Link href={`/${Menuitems.pathname}/${_v.menu_name}`}>{_v.title}</Link></Menu.Item>
                                            )
                                        })
                                        }
                                    </SubMenu>
                            )
                        })
                        }
                    </>

            )
          })
        }
      </Menu>
    </>
  );
}

export default CustomMenu