import {UserOutlined , FundOutlined , FormOutlined , AuditOutlined , BarChartOutlined , PieChartOutlined} from "@ant-design/icons";

const  Frontoffice_menu = {
    pathname : 'Frontoffice',
    redirectPage : `/Frontoffice/analysis_graph`,
    menu : [
        {
            title : 'เมนูสำหรับผู้ใช้ทัวไป',
            list : [
                {menu_name : 'sshe_issue' , title : 'SSHE ISSUE' , type : 'menu'  , icon : UserOutlined},
                {menu_name : 'sshe_incident' , title : 'SSHE INCIDENT' , type : 'menu'  , icon : FormOutlined},
                {menu_name : 'sshe_analysis_submenu' , title : 'SSHE ANALYSIS' , type : 'submenu' , icon : FundOutlined ,
                    menu_list : [
                        {menu_name : 'analysis_report' , title : 'ANALYSIS REPORT' , type : 'menu' , icon : AuditOutlined},
                        {menu_name : 'summary_static' , title : 'SUMMARY STATIC' , type : 'menu' , icon : BarChartOutlined},
                        {menu_name : 'analysis_graph' , title : 'ANALYSIS GRAPH' , type : 'menu' , icon : PieChartOutlined},
                    ]
                }
            ]
        },
    ]
}

export default Frontoffice_menu