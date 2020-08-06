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
  saveStore: (value: dashboardModel.Store) => void
}

export interface ElementsGeneratorProps {
  collection: string
  globalConfig: Record<string, any> | null
  elements: dashboardModel.Element[]
  removeElement: (value: string) => void
  saveStore: (value: dashboardModel.Store) => void
}
