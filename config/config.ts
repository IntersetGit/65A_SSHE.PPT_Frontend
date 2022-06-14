import { defineConfig } from 'umi';

// import defaultSettings from './defaultSettings';
import { routes } from './routes';

// const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  layout: false,
  dva: {
    hmr: true,
  },
  theme: { 'root-entry-name': 'variable' },
  manifest: { basePath: '/' },
  webpack5: {},
  title: 'SSHE-AI',
  targets: {
    ie: 11,
  },
  routes,
  mfsu: {},
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  exportStatic: {},
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  esbuild: {},
  // history: {
  //   type: 'hash',
  // } ,
});
