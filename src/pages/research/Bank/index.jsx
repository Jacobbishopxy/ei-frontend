/**
 * Created by Jacob Xie on 7/6/2020.
 */

import React from 'react';
import { Tabs } from 'antd';

import { CustomDashboard } from '@/components/CustomDashboardHelper';
import { BulbOutlined, FileOutlined, PayCircleOutlined, StarOutlined } from '@ant-design/icons';


const db = 'bank';
const collection = 'layout';

export default () => {
  return (
    <Tabs
      defaultActiveKey='1'
      onChange={k => console.log(k)}
      type="editable-card"
    >
      <Tabs.TabPane
        tab={<span><BulbOutlined/>简介</span>}
        closable={false} key="1"
      >
        <CustomDashboard db={db} collection={collection} panel='intro'/>
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<span><FileOutlined/>报告</span>}
        closable={false} key="2"
      >
        <CustomDashboard db={db} collection={collection} panel='report'/>
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<span><PayCircleOutlined/>财务</span>}
        closable={false} key="3"
      >
        <CustomDashboard db={db} collection={collection} panel='finance'/>
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<span><StarOutlined/>核心</span>}
        closable={false} key="4"
      >
        <CustomDashboard db={db} collection={collection} panel='core'/>
      </Tabs.TabPane>

    </Tabs>
  );
};
