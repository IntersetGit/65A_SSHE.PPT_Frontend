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
    path: '/', redirect: '/login'
  },
  {
    path : '/login',
    name : 'เข้าสู่ระบบ',
    component : 'login'
  },
  ...frontoffice_menu.ROUTES,
  ...backoffice_menu.ROUTES,
  {
    name : '404',
    path : '/404',
    component : '404'
  },
  {
    component : '404'
  }
];
