/**
 * Created by Jacob Xie on 8/5/2020.
 */

import * as dashboardModel from '@/utilities/dashboardModel';


export interface DashboardProps {
  layoutDb: dashboardModel.DbType;
  storeDb: dashboardModel.DbType;
  collection: string;
  templatePanel: dashboardModel.TemplatePanel;
  hasSymbolSelector: boolean;
}
