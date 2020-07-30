/**
 * Created by Jacob Xie on 7/30/2020.
 */

import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import RGL, { WidthProvider } from 'react-grid-layout';

import { DataCard } from '@/components/CustomDashboardHelper/DashboardModulePanel';
import { SymbolSelector } from '@/components/CustomDashboardHelper/DashboardController/SymbolSelector';
import { DashboardEditor } from '@/components/CustomDashboardHelper/DashboardController/DashboardEditor';
import { useDidMountEffect } from '@/utilities/utils';

import * as dashboardModel from '@/utilties/dashboardModel';
import * as dashboardService from '@/services/eiDashboard';

import styles from './index.less';

// const ReactGridLayout = WidthProvider(RGL);

export interface DevDashboardProps {
  value: string
}

export const DevDashboard: React.FC<DevDashboardProps> = (props) => {

  const [v, setV] = useState<string>("")

  return (
    <div>{props.value}</div>
  )
}
