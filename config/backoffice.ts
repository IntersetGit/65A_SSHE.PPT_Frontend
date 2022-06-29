const backoffice_menu = {
  PATHNAME: 'backoffice',
  BACK_GROUND_IMAGES: '',
  REDIRECT_PATH: '/backoffice/manage/project_manage',
  ROUTES: [
    {
      path: '/backoffice',
      name: 'BACKOFFICE',
      component: '../layouts/BaseLayout',
      icon: 'blockoutline',
      routes: [
        {
          path: '/backoffice/manage',
          type: 'group',
          name: 'จัดการข้อมูลใช้งาน',
          icon: 'blockoutline',
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
          icon: 'blockoutline',
          routes: [
            {
              path: '/backoffice/risk-manage/projecttype_manage',
              icon: 'project2',
              name: 'Project Type',
              component: 'BackOffice/projecttype_manage',
            },
            {
              path: '/backoffice/risk-manage/activity_manage',
              icon: 'activity2',
              name: 'Works Activity',
              component: 'BackOffice/activity_manage',
            },
            {
              path: '/backoffice/risk-manage/impact_manage',
              icon: 'impact',
              name: 'Hazard',
              component: 'BackOffice/impact_manage',
            },
            {
              path: '/backoffice/risk-manage/mitigration_manage',
              icon: 'mitigation',
              name: 'Existing controls',
              component: 'BackOffice/mitigration_manage',
            },
            {
              path: '/backoffice/risk-manage/treatment_plan',
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
          path: '/backoffice/sshe_issue',
          type: 'group',
          name: 'ข้อมูล SSHE ISSUE',
          icon: 'blockoutline',
          routes: [
            {
              path: '/backoffice/sshe_issue/issue_type',
              icon: 'security',
              name: 'ISSUE TYPE',
              component: 'BackOffice/issue_type_manage',
            },
            {
              path: '/backoffice/sshe_issue/hazard',
              icon: 'mitigation2',
              name: 'Hazard',
              component: 'BackOffice/hazard_manage',
            },
            {
              path: '/backoffice/sshe_issue/incident_type',
              icon: 'incidenttype',
              name: 'Incident Type',
              component: 'BackOffice/incident_type_manage',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/backoffice/settings',
          type: 'group',
          name: 'Setting',
          icon: 'blockoutline',
          routes: [
            {
              path: '/backoffice/settings/issue_info',
              icon: 'SSHE-Incident',
              name: 'Issue Info',
              component: 'BackOffice/issue_info',
            },
            {
              path: '/backoffice/settings/alert',
              icon: 'redalarm',
              name: 'Incident Info',
              component: 'BackOffice/alert',
            },
            {
              component: '404',
            },
          ],
        },

        // {
        //   path: '/backoffice/security_manage',
        //   icon: 'security',
        //   name: 'Security',
        //   component: 'FrontOffice/analysis_graph',
        // },
        // {
        //   path: '/backoffice/safety_manage',
        //   icon: 'mitigation2',
        //   name: 'Safety',
        //   component: 'FrontOffice/analysis_graph',
        // },
        // {
        //   path: '/backoffice/health_manage',
        //   icon: 'health',
        //   name: 'Health',
        //   component: 'FrontOffice/analysis_graph',
        // },
        // {
        //   path: '/backoffice/environment_manage',
        //   icon: 'enviroment',
        //   name: 'Environment',
        //   component: 'FrontOffice/analysis_graph',
        // },
        {
          component: '404',
        },
      ],
    },
  ],
};

export default backoffice_menu;
