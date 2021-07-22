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
    name: 'Monitor',
    icon: 'MonitorOutlined',
    path: '/brokers',
    component: './Brokers',
  },
  {
    name: 'Clients',
    icon: 'DesktopOutlined',
    path: '/clients',
    component: './Clients',
  },
  {
    name: 'Topics',
    icon: 'ApartmentOutlined',
    path: '/topics',
    component: './Topics',
  },
  {
    name: 'Subscriptions',
    icon: 'ProfileOutlined',
    path: '/subscriptions',
    component: './Subscriptions',
  },

  {
    name: 'Rules',
    icon: 'book',
    path: '/rules',
    component: './Rules',
  },
  {
    path: '/tool',
    name: 'Tools',
    icon: 'ToolOutlined',
    // component: './Websocket',
    routes: [
      {
        path: '/tool/websocket',
        name: 'Websocket',
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
