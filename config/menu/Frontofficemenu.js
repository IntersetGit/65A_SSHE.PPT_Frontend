import {UserOutlined , FundOutlined , FormOutlined , AuditOutlined , BarChartOutlined , PieChartOutlined , WarningOutlined , IssuesCloseOutlined} from "@ant-design/icons";

const  Frontoffice_menu = {
    pathname : 'Frontoffice',
    redirectPage : `/Frontoffice/analysis_graph`,
    menu : [
        {
            title : 'เมนูสำหรับผู้ใช้ทัวไป',
            list : [
                {menu_name : 'risk_assessment' , title : 'Risk Assessment' , type : 'submenu' , icon : WarningOutlined ,
                    menu_list : [
                        {menu_name : 'risk_identification_template' , title : 'Risk Identification Template' , type : 'menu' , icon : IssuesCloseOutlined},
                        {menu_name : 'risk_register_and_action_plan' , title : 'Risk Register and Action Plan' , type : 'menu' , icon : IssuesCloseOutlined}
                    ]
                },
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