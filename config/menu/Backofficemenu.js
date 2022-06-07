import { project , user2 , contractor2 , Impact , activity2 , mitigation , procedure , security , mitigation2 , health ,enviroment } from './pictureicon'
import PTTBACKGROUND from '../../public/assets/bg-section-3-black.png'

const  Backoffice_menu = {
    pathname : 'Backoffice',
    BACK_GROUND_IMAGES : PTTBACKGROUND,
    redirectPage : `/Backoffice/contractor_company_mange`,
    menu : [
        {
            title : 'จัดการข้อมูลใช้งาน',
            list : [
                {menu_name : 'project_manage' , title : 'โครงการ' , type : 'menu' , icon : project},
                {menu_name : 'contractor_company_mange' , title : 'ผู้รับเหมา' , type : 'menu'  , icon : contractor2},
                {menu_name : 'non_ad_user_manage' , title : 'ผู้ใช้งานระบบ' , type : 'menu'  , icon : user2},
            ]
        },
        {
            title : 'ข้อมูล Risk Identification',
            list : [
                {menu_name : 'activity_manage' , title : 'Activity' , type : 'menu' , icon : activity2},
                {menu_name : 'impact_manage' , title : 'Impact' , type : 'menu' , icon : Impact},
                {menu_name : 'mitigration_manage' , title : 'Mitigration' , type : 'menu' , icon : mitigation},
                {menu_name : 'procedure_jsea_manage' , title : 'Procedure & JSEA' , type : 'menu' , icon : procedure},
            ]
        },
        {
            title : 'ข้อมูล SSHE ISSUE',
            list : [
                {menu_name : 'security_manage' , title : 'Security' , type : 'menu' , icon : security},
                {menu_name : 'safety_manage' , title : 'Safety' , type : 'menu' , icon : mitigation2},
                {menu_name : 'health_manage' , title : 'Health' , type : 'menu' , icon : health},
                {menu_name : 'environment_manage' , title : 'Environment' , type : 'menu' , icon : enviroment},
            ]
        }
    ]
}

export default Backoffice_menu