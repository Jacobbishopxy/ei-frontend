import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { Dashboard } from '@/components/DashboardHelper/Dashboard';

import styles from './index.less';

export default () => {
  return (
    <Dashboard value={"halo"}/>
  );
};
