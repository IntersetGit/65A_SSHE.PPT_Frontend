import { Menu } from "antd";
import Icon from '@ant-design/icons';
import Link from 'next/link';
import PTTBACKGROUND from '../../public/assets/bg-section-3-black.png'

/*
* TODO: เพิ่ม path resolver สำหรับ select Menu
* */

const { SubMenu } = Menu;

const CustomMenu = ({Menuitems}) => {

  return (
    <>
      <Menu
            selectable={false}
            multiple
            theme="dark"
            mode="inline"
            // defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0, fontSize: "0.9rem" , fontWeight : "bold" , overflowX : 'hidden' , backgroundImage : `url(${PTTBACKGROUND})` , backgroundRepeat : 'no-repeat' , backgroundSize : 'cover' , backgroundPosition : 'center' }}
      >
        {
          Menuitems.menu.map((value,key) =>{
            return(
                value.title ?
                    <Menu.ItemGroup key={`${Menuitems.pathname}-${key}`} title={<span style={{color : 'white' , fontWeight : 'bold'  , padding : '3px 6px 6px 6px' , borderRadius : '10px'}}>{value.title}</span>}>
                        {value.list.map((v , k) =>{
                            return(
                                v.type === 'menu' ?
                                    <Menu.Item key={`${v.menu_name}${k+1}`} icon={<Icon component={v.icon} />}>
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
                                    <Menu.Item key={`${v.menu_name}${k+1}`} icon={<Icon component={PictureIcon} />}>
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