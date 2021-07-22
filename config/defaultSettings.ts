// import Admin from '@/pages/Admin';
import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Coolpy7 Admin',
  pwa: false,
  logo: '/ant/cp7logo137.png',
  iconfontUrl: '',
};

export default Settings;
