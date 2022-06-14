const frontoffice_menu = {
    PATHNAME: 'frontoffice',
    BACK_GROUND_IMAGES: '',
    REDIRECT_PATH : '/frontoffice/risk/risk_register_and_action_plan',
    ROUTES: [
      {
        path: '/frontoffice',
        name : 'FRONTOFFICE',
        component: '../layouts/BaseLayout',
        routes: [
          {
            path: '/frontoffice/risk',
            name : 'RISK ASSESSMENT',
            icon : 'Risk Assessment',
            routes : [
              {
                path: '/frontoffice/risk/risk_identification_template',
                icon: 'Risk Identification',
                name: 'Risk Identification Template',
                component : './FrontOffice/risk_identification_template'
              },
              {
                path: '/frontoffice/risk/risk_register_and_action_plan',
                icon: 'Risk Register',
                name: 'Risk Register and Action Plan',
                component : './FrontOffice/risk_register_and_action_plan'
              },
              {
                component : '404'
              }
            ]
          },
          {
            path: '/frontoffice/sshe_issue',
            icon: 'sshe-issue',
            name: 'SSHE ISSUE',
            component : './FrontOffice/sshe_issue'
          },
          {
            path: '/frontoffice/sshe_incident',
            icon: 'SSHE-Incident',
            name: 'SSHE INCIDENT',
            component : './FrontOffice/sshe_incident'
          },
          {
            path: '/frontoffice/analysis',
            type : 'group',
            name : 'SSHE ANALYSIS',
            icon : 'SSHE-Analysis',
            routes : [
              {
                path: '/frontoffice/analysis/analysis_report',
                icon: 'Analysis-Report',
                name: 'ANALYSIS REPORT',
                component : './FrontOffice/analysis_report'
              },
              {
                path: '/frontoffice/analysis/analyze_of_issues',
                icon: 'SSHE-Statistic',
                name: 'ANALYZE OF SSHE ISSUES',
                component : './FrontOffice/analysis_graph'
              },
              {
                component : '404'
              }
            ]
          },
          {
            component : '404'
          }
        ],
      },
    ],
  };
  
  export default frontoffice_menu;
  