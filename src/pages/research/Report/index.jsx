/**
 * Created by Jacob Xie on 7/2/2020.
 */

import React from 'react';

import { CustomDashboard } from '@/components/CustomDashboardHelper';

const layoutPanelName = 'stockReport';

export default () => {
  return (
    <CustomDashboard
      panelName={layoutPanelName}
    />
  );
};
