// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              name: 'welcome',
              path: '/welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              name: 'admin',
              path: '/admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
            },
            {
              name: 'business-data',
              path: '/bizData',
              icon: 'dashboard',
              routes: [
                {
                  name: 'cement',
                  path: '/bizData/industryCement',
                  component: './bizData/IndustryCement',
                },
              ],
            },
            {
              name: 'research',
              path: '/research',
              icon: 'experiment',
              routes: [
                {
                  name: 'candlestick',
                  path: '/research/tradingview',
                  component: './research/TradingView',
                },
                // {
                //   name: 'grafana',
                //   path: '/research/grafanaview',
                //   component: './research/GrafanaView',
                // },
                // {
                //   name: 'mongo',
                //   path: '/research/mongoview',
                //   component: './research/MongoView',
                // },
              ],
            },
            {
              name: 'demo',
              path: '/demo',
              icon: 'rocket',
              routes: [
                {
                  name: 'custom-grids',
                  path: '/demo/draggableGrid',
                  component: './demo/DraggableGrid',
                },
                {
                  name: 'custom-table-operation',
                  path: '/demo/customtableoperation',
                  component: './demo/CustomTableOperation',
                },
                {
                  name: 'custom-table-data-operation',
                  path: '/demo/customtabledataoperation',
                  component: './demo/CustomTableDataOperation',
                },
                {
                  name: 'gql-data-fetch',
                  path: '/demo/gqldatafetch',
                  component: './demo/GqlDataFetch',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
