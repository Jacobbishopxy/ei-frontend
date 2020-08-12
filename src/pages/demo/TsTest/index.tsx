/**
 * Created by Jacob Xie on 8/6/2020.
 */

import React from 'react';

import * as dashboardModel from '@/utilities/dashboardModel';
import { Dashboard } from '@/components/DashboardHelper/Dashboard';

const layoutDb = dashboardModel.DbType.template;
const storeDb = dashboardModel.DbType.industry
const collection = 'dev'
const templatePanel = {
  template: 'dev',
  panel: 'dev'
}

export default () => {
  return (
    <Dashboard
      layoutDb={layoutDb}
      storeDb={storeDb}
      collection={collection}
      templatePanel={templatePanel}
      hasSymbolSelector
    />
  );
};
