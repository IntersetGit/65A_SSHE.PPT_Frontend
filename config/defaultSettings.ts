import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
  siderWidth?: number;
} = {
  navTheme: 'dark',
  headerHeight: 60,
  contentWidth: 'Fluid',
  siderWidth: 245,
  layout: 'mix',
  title: 'SSHE-AI',
  fixedHeader: true,
  fixSiderbar: true,
  logo: 'https://cdn.discordapp.com/attachments/708780548440457246/984039269020598312/PTT_Public_Company_Limited.svg',
  pwa: false,
  primaryColor: '#1890ff',
};

export default Settings;
