import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { DevDashboard } from '@/components/CustomDashboardHelper/Dashboard';

import styles from './index.less';

export default () => {
  return (
    <DevDashboard value={"halo"}/>
  );
};
