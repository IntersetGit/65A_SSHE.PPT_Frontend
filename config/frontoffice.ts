const frontoffice_menu = {
  PATHNAME: 'frontoffice',
  BACK_GROUND_IMAGES: '',
  REDIRECT_PATH: '/frontoffice/risk/risk_register_and_action_plan',
  ROUTES: [
    {
      path: '/frontoffice',
      name: 'FRONTOFFICE',
      component: '../layouts/BaseLayout',
      routes: [
        {
          path: '/frontoffice/user-profile',
          exact: true,
          component: './FrontOffice/user-profile',
          name: 'My Profile',
          hideInMenu: true,
        },
        {
          path: '/frontoffice/team-management',
          exact: true,
          component: './FrontOffice/team-management',
          name: 'Team Management',
          hideInMenu: true,
        },
        {
          path: '/frontoffice/risk/risk_register_and_action_plan',
          name: 'Risk Register & Plan',
          icon: 'Risk Assessment',
          component: './FrontOffice/risk_register_and_action_plan',
          // routes: [
          //   {
          //     path: '/frontoffice/risk/risk_identification_template',
          //     icon: 'Risk Identification',
          //     name: 'Risk Identification Template',
          //     component: './FrontOffice/risk_identification_template',
          //   },
          //   {
          //     path: '/frontoffice/risk/risk_register_and_action_plan',
          //     icon: 'Risk Register',
          //     name: 'Risk Register and Action Plan',
          //     component: './FrontOffice/risk_register_and_action_plan',
          //   },
          //   {
          //     component: '404',
          //   },
          // ],
        },
        {
          path: '/frontoffice/sshe_issue',
          icon: 'sshe-issue',
          name: 'SSHE ISSUE',
          component: './FrontOffice/sshe_issue',
        },
        {
          path: '/frontoffice/sshe_incident',
          icon: 'SSHE-Incident',
          name: 'SSHE INCIDENT',
          component: './FrontOffice/sshe_incident',
        },
        {
          path: '/frontoffice/sshe_analysis',
          type: 'group',
          name: 'SSHE DASHBOARD',
          icon: 'SSHE-Analysis',
          component: './FrontOffice/analysis_graph',
          // routes: [
          //   {
          //     path: '/frontoffice/analysis/analysis_report',
          //     icon: 'Analysis-Report',
          //     name: 'ANALYSIS REPORT',
          //     component: './FrontOffice/analysis_report',
          //   },
          //   {
          //     path: '/frontoffice/analysis/analyze_of_issues',
          //     icon: 'SSHE-Statistic',
          //     name: 'SUMMERY STATIC',
          //     component: './FrontOffice/analysis_graph',
          //   },
          //   {
          //     path: '/frontoffice/analysis/analysis_graph',
          //     icon: 'SSHE-Statistic',
          //     name: 'ANALYSIS GRAPH',
          //     component: './FrontOffice/analysis_graph',
          //   },
          //   {
          //     path: '/frontoffice/analysis/sshe_kpi',
          //     icon: 'SSHE-Statistic',
          //     name: 'SSHE KPI',
          //     component: './FrontOffice/analysis_graph',
          //   },
          //   {
          //     component: '404',
          //   },
          // ],
        },
        {
          component: '404',
        },
      ],
    },
  ],
};

export default frontoffice_menu;
