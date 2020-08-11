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

export interface ElementGeneratorProps {
  collection: string
  globalConfig: Record<string, any> | null
  element: dashboardModel.Element
  removeElement: (value: string) => void
  updateStore: (value: dashboardModel.Store) => void
  deleteStore: (value: dashboardModel.Anchor) => void
  headVisible: boolean
}
