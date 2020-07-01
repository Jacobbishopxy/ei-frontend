import React, { useState, useEffect } from 'react';

import { CustomDashboard } from '@/components/CustomDashboardHelper';

import styles from './index.less';

const layoutPanelName = 'stockIntro';

export default () => {

  return (
    <CustomDashboard
      panelName={layoutPanelName}
    />
  );
};
