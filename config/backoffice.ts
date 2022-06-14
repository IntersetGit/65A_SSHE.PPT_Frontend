const backoffice_menu = {
  PATHNAME: 'backoffice',
  BACK_GROUND_IMAGES: '',
  REDIRECT_PATH: '/backoffice/manage/project_manage',
  ROUTES: [
    {
      path: '/backoffice',
      name: 'BACKOFFICE',
      component: '../layouts/BaseLayout',
      routes: [
        {
          path: '/backoffice/manage',
          type: 'group',
          name: 'จัดการข้อมูลใช้งาน',
          routes: [
            {
              path: '/backoffice/manage/project_manage',
              icon: 'enviroment',
              name: 'โครงการ',
              component: 'BackOffice/project_manage',
            },
            {
              path: '/backoffice/manage/contractor_company_mange',
              icon: 'contractor2',
              name: 'บริษัทผู้รับเหมา',
              component: 'BackOffice/contractor_company_mange',
            },
            {
              path: '/backoffice/manage/non_ad_user_manage',
              icon: 'user2',
              name: 'ผู้ใช้งานระบบ',
              component: 'BackOffice/non_ad_user_manage',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/backoffice/risk-manage',
          type: 'group',
          name: 'ข้อมูล Risk Identification',
          routes: [
            {
              path: '/backoffice/risk-manage/activity_manage',
              icon: 'activity2',
              name: 'Activity',
              component: 'BackOffice/activity_manage',
            },
            {
              path: '/backoffice/risk-manage/impact_manage',
              icon: 'impact',
              name: 'Impact/Hazard',
              component: 'BackOffice/impact_manage',
            },
            {
              path: '/backoffice/risk-manage/mitigration_manage',
              icon: 'mitigation',
              name: 'Mitigration/Control',
              component: 'BackOffice/mitigration_manage',
            },
            {
              path: '/backoffice/risk-manage/procedure_jsea_manage',
              icon: 'procedure',
              name: 'Treatment Plan',
              component: 'BackOffice/procedure_jsea_manage',
            },
            {
              component: '404',
            },
          ],
        },

        {
          path: '/backoffice/security_manage',
          icon: 'security',
          name: 'Security',
          component: 'FrontOffice/analysis_graph',
        },
        {
          path: '/backoffice/safety_manage',
          icon: 'mitigation2',
          name: 'Safety',
          component: 'FrontOffice/analysis_graph',
        },
        {
          path: '/backoffice/health_manage',
          icon: 'health',
          name: 'Health',
          component: 'FrontOffice/analysis_graph',
        },
        {
          path: '/backoffice/environment_manage',
          icon: 'enviroment',
          name: 'Environment',
          component: 'FrontOffice/analysis_graph',
        },
        {
          component: '404',
        },
      ],
    },
  ],
};

export default backoffice_menu;
