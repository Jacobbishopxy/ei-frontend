/**
 * Created by Jacob Xie on 7/6/2020.
 */

import React from 'react';
import {Tabs} from 'antd';

import { CustomDashboard } from '@/components/CustomDashboardHelper';


export default () => {
  return (
    <Tabs
      defaultActiveKey="1"
      onChange={k => console.log(k)}
    >
      <Tabs.TabPane tab="简介" key="1">
        <CustomDashboard panelName='stockIntro'/>
      </Tabs.TabPane>
      <Tabs.TabPane tab="报告" key="2">
        <CustomDashboard panelName='stockReport'/>
      </Tabs.TabPane>
      <Tabs.TabPane tab="财务" key="3">
        <CustomDashboard panelName='stockFinance'/>
      </Tabs.TabPane>
      <Tabs.TabPane tab="核心" key="4">
        <CustomDashboard panelName='stockCore'/>
      </Tabs.TabPane>

    </Tabs>
  );
};
