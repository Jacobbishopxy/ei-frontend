/**
 * Created by Jacob Xie on 7/6/2020.
 */

import React from 'react';
import { Tabs } from 'antd';

import { CustomDashboard } from '@/components/CustomDashboardHelper';
import { BulbOutlined, FileOutlined, PayCircleOutlined, StarOutlined } from '@ant-design/icons';


export default () => {
  return (
    <Tabs
      defaultActiveKey="1"
      onChange={k => console.log(k)}
    >
      <Tabs.TabPane tab={<span><BulbOutlined/>简介</span>} key="1">
        <CustomDashboard panelName='stockIntro'/>
      </Tabs.TabPane>
      <Tabs.TabPane tab={<span><FileOutlined/>报告</span>} key="2">
        <CustomDashboard panelName='stockReport'/>
      </Tabs.TabPane>
      <Tabs.TabPane tab={<span><PayCircleOutlined/>财务</span>} key="3">
        <CustomDashboard panelName='stockFinance'/>
      </Tabs.TabPane>
      <Tabs.TabPane tab={<span><StarOutlined/>核心</span>} key="4">
        <CustomDashboard panelName='stockCore'/>
      </Tabs.TabPane>

    </Tabs>
  );
};
