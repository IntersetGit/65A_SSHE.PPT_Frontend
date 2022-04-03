import {UserOutlined} from "@ant-design/icons";

const  Frontoffice_menu = {
    pathname : 'Frontoffice',
    menu : [
        {
            title : 'เมนูสำหรับผู้ใช้ทัวไป',
            list : [
                {menu_name : 'contractor_company_mange' , title : 'จัดการข้อมูลบริษัทผู้รับเหมา' , type : 'menu'  , icon : UserOutlined},
                {menu_name : 'non_ad_user_manage' , title : 'จัดการผู้ใช้นอก AD' , type : 'menu'  , icon : UserOutlined},
                {menu_name : 'test_dropdown_menu' , title : 'Test Dropdown Menu' , type : 'submenu' , icon : UserOutlined ,
                    menu_list : [
                        {menu_name : 'tes1' , title : 'test1' , type : 'menu' , icon : UserOutlined}
                    ]
                }
            ]
        },
    ]
}

export default Frontoffice_menu