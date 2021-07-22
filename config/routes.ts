export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    name: '监控台',
    icon: 'MonitorOutlined',
    path: '/brokers',
    component: './Brokers',
  },
  {
    name: '客户端',
    icon: 'DesktopOutlined',
    path: '/clients',
    component: './Clients',
  },
  {
    name: '主题',
    icon: 'ApartmentOutlined',
    path: '/topics',
    component: './Topics',
  },
  {
    name: '订阅',
    icon: 'ProfileOutlined',
    path: '/subscriptions',
    component: './Subscriptions',
  },

  {
    name: '规则引擎',
    icon: 'book',
    path: '/rules',
    component: './Rules',
  },
  {
    path: '/tool',
    name: '工具',
    icon: 'ToolOutlined',
    // component: './Websocket',
    routes: [
      {
        path: '/tool/websocket',
        name: 'WebSocket',
        icon: 'ToolOutlined',
        component: './Websocket',
      },
    ],
  },
  {
    path: '/',
    redirect: '/brokers',
  },

  {
    component: './404',
  },
];
