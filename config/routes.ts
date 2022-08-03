import React from 'react';
import backoffice_menu from './backoffice';
import frontoffice_menu from './frontoffice';

export interface Route {
  path: string;
  routes: Array<{
    exact?: boolean;
    icon: React.ReactNode;
    name: string;
    path: string;
    // Optional secondary menu
    routes?: Route['routes'];
  }>;
}

export const routes = [
  {
    path: '/',
    redirect: '/frontoffice/risk/risk_register_and_action_plan',
  },
  {
    path: '/login',
    name: 'เข้าสู่ระบบ',
    component: 'login',
  },
  {
    path: '/passwordchange',
    name: 'แก้ไขรหัสผ่านครั้งแรก',
    component: 'passwordChanger',
  },
  ...frontoffice_menu.ROUTES,
  ...backoffice_menu.ROUTES,
  {
    name: '404',
    path: '/404',
    component: '404',
  },
  {
    component: '404',
  },
];
