import { Menu } from "antd";
import Icon from '@ant-design/icons';
import Link from 'next/link';
import PTTBACKGROUND from '../../public/assets/bg-section-3-black.png'
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

/*
* TODO: เพิ่ม path resolver สำหรับ select Menu
* */

const { SubMenu } = Menu;

const CustomMenu = ({Menuitems}) => {

    const [selectedKeys,setSelectedkeys] = useState('')
    const router = useRouter()

    useEffect(() =>{
        setSelectedkeys(router.pathname.split('/')[2])
        console.log(router.pathname.split('/')[2])
    },[router.pathname])

  return (
    <>
      <Menu
            //multiple
            //selectable
            selectable
            theme="dark"
            mode="inline"
            defaultOpenKeys={['sshe_analysis_submenu']}
            defaultSelectedKeys={selectedKeys}
            selectedKeys={selectedKeys}
            style={{ height: "100%", borderRight: 0, fontSize: "1rem" , fontWeight : "normal" , overflowX : 'hidden' , backgroundImage : `url(${PTTBACKGROUND})` , backgroundRepeat : 'no-repeat' , backgroundSize : 'cover' , backgroundPosition : 'center' }}
      >
        {
            Menuitems.menu.map((value,key) =>{
            return(
                value.title ?
                <Menu.ItemGroup key={`${Menuitems.pathname}-${key}`} title={<span style={{color : 'white' , fontSize : '1rem', fontWeight : 'normal'  , padding : '3px 6px 6px 6px' , borderRadius : '10px'}}>{value.title}</span>}>
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