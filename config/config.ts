// https://umijs.org/config/
import { defineConfig } from 'umi'
import defaultSettings from './defaultSettings'
import proxy from './proxy'


const { REACT_APP_ENV } = process.env
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'InforeCapital',
    locale: true,
    siderWidth: 200,
    logo: '/api/homeLogo'
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
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      name: 'welcome',
      path: '/welcome',
      icon: 'smile',
      component: './Welcome',
    },
    {
      path: '/admin',
      name: 'admin',
      icon: 'crown',
      access: 'canAdmin',
      component: './Admin',
      routes: [
        {
          path: '/admin/sub-page',
          name: 'sub-page',
          icon: 'smile',
          component: './Welcome',
        },
      ],
    },
    {
      name: "estate",
      path: "/estate",
      icon: "ReadOutlined",
      routes: [
        {
          name: "comment",
          path: "/estate/comment",
          component: "./estate/Comment"
        }
      ]
    },
    {
      name: 'research',
      path: '/research',
      icon: 'experiment',
      routes: [
        // {
        //   name: 'candlestick',
        //   path: '/research/tradingview',
        //   component: './research/TradingView',
        // },
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
        // {
        //   name: 'postgres',
        //   path: '/research/postgresview',
        //   component: './research/PostgresView',
        // },
        {
          name: 'market',
          path: '/research/market',
          component: './research/Market',
        },
        {
          name: 'bank',
          path: '/research/bank',
          component: './research/Bank',
        },
      ],
    },
    {
      name: 'demo',
      path: '/demo',
      icon: 'rocket',
      access: 'dev',
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
        {
          name: 'file-manager',
          path: '/demo/filemanager',
          component: './demo/FileManager',
        },
        {
          name: 'tree-view',
          path: '/demo/treeview',
          component: './demo/TreeView',
        },
        {
          name: 'ts-test',
          path: '/demo/tstest',
          component: './demo/TsTest',
        },
        {
          name: 'callchildfuncfromparent',
          path: '/demo/callchildfuncfromparent',
          component: './demo/CallChildFuncFromParent',
        },
      ],
    },
    {
      path: '/',
      redirect: '/welcome',
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
})
