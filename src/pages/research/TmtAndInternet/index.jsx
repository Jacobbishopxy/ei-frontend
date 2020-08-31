/**
 * Created by Jacob Xie on 7/6/2020.
 */

import React from 'react';
import {Tabs} from 'antd';

import {CustomDashboard} from '@/components/CustomDashboardHelper';
import {BulbOutlined, FileOutlined, PayCircleOutlined, StarOutlined} from '@ant-design/icons';


const db = 'tmtandinternet';
const collection = 'layout';
const symbolList = [
  {
    key: '002415.SZ',
    name: "海康威视",
    author: "张珣"
  },
  {
    key: '3690.HK',
    name: "美团点评",
    author: "凤超"
  },
  {
    key: '0700.HK',
    name: "腾讯控股",
    author: "孙建树"
  },
]
const defaultSymbol = '002415.SZ'

export default () => {
  return (
    <Tabs
      defaultActiveKey='1'
      onChange={k => console.log(k)}
    >
      <Tabs.TabPane
        tab={<span><BulbOutlined/>要点</span>}
        closable={false} key="1"
      >
        <CustomDashboard
          db={db}
          collection={collection}
          panel='intro'
          symbolList={symbolList}
          defaultSymbol={defaultSymbol}
        />
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<span><FileOutlined/>报告</span>}
        closable={false} key="2"
      >
        <CustomDashboard
          db={db}
          collection={collection}
          panel='report'
          symbolList={symbolList}
          defaultSymbol={defaultSymbol}
        />
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<span><PayCircleOutlined/>财务</span>}
        closable={false} key="3"
      >
        <CustomDashboard
          db={db}
          collection={collection}
          panel='finance'
          symbolList={symbolList}
          defaultSymbol={defaultSymbol}
        />
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<span><StarOutlined/>核心</span>}
        closable={false} key="4"
      >
        <CustomDashboard
          db={db}
          collection={collection}
          panel='core'
          symbolList={symbolList}
          defaultSymbol={defaultSymbol}
        />
      </Tabs.TabPane>

    </Tabs>
  );
};
