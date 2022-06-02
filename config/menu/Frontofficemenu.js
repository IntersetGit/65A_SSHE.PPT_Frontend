import { SSHE_Analysis , Risk_Assessment , Risk_Identification , Risk_Register , sshe_issue , SSHE_Incident , Analysis_Report , SSHE_Statistic , SSHE_Graph  } from "./pictureicon";

const  Frontoffice_menu = {
    pathname : 'Frontoffice',
    redirectPage : `/Frontoffice/analysis_graph`,
    menu : [
        {
            title : 'เมนูสำหรับผู้ใช้ทัวไป',
            list : [
                {menu_name : 'risk_assessment' , title : 'Risk Assessment' , type : 'submenu' , icon : Risk_Assessment ,
                    menu_list : [
                        {menu_name : 'risk_identification_template' , title : 'Risk Identification Template' , type : 'menu' , icon : Risk_Identification},
                        {menu_name : 'risk_register_and_action_plan' , title : 'Risk Register and Action Plan' , type : 'menu' , icon : Risk_Register}
                    ]
                },
                {menu_name : 'sshe_issue' , title : 'SSHE ISSUE' , type : 'menu'  , icon : sshe_issue},
                {menu_name : 'sshe_incident' , title : 'SSHE INCIDENT' , type : 'menu'  , icon : SSHE_Incident},
                {menu_name : 'sshe_analysis_submenu' , title : 'SSHE ANALYSIS' , type : 'submenu' , icon : SSHE_Analysis ,
                    menu_list : [
                        {menu_name : 'analysis_report' , title : 'ANALYSIS REPORT' , type : 'menu' , icon : Analysis_Report},
                        {menu_name : 'summary_static' , title : 'SUMMARY STATIC' , type : 'menu' , icon : SSHE_Statistic},
                        {menu_name : 'analysis_graph' , title : 'ANALYSIS GRAPH' , type : 'menu' , icon : SSHE_Graph},
                    ]
                }
            ]
        },
    ]
}

export default Frontoffice_menu