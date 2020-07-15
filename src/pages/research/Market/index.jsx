/**
 * Created by Jacob Xie on 7/15/2020.
 */

import React from 'react';
import { Tabs } from 'antd';

import { CustomDashboard } from '@/components/CustomDashboardHelper';
import { BulbOutlined } from '@ant-design/icons';


const db = 'market';
const collection = 'layout';

export default () => {
  return (
    <Tabs
      defaultActiveKey='1'
      onChange={k => console.log(k)}
      type="editable-card"
    >
      <Tabs.TabPane
        tab={<span><BulbOutlined/>要点</span>}
        closable={false} key="1"
      >
        <CustomDashboard db={db} collection={collection} panel='intro'/>
      </Tabs.TabPane>
    </Tabs>
  );
};
