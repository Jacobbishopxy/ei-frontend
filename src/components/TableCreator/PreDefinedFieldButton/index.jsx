/**
 * Created by Jacob Xie on 4/13/2020.
 */

import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined, StarOutlined } from '@ant-design/icons';

const preDefinedFieldMap = key => {
  switch (key) {
    case 'date':
      return {fieldName: 'date', nameAlias: '日期', fieldType: 9, indexOption: 'asc', description: 'e.g. 20190101'};
    case 'symbol':
      return {fieldName: 'symbol', nameAlias: '代码', fieldType: 2, indexOption: 'dsc', description: 'e.g. 000001.SZ'};
    case 'region':
      return {fieldName: 'region', nameAlias: '地区', fieldType: 2, indexOption: 'dsc', description: '地区'};
    case 'price':
      return {fieldName: 'price', nameAlias: '价格', fieldType: 1, description: '带小数点'};
    default:
      return {};
  }
};


export default ({onClick}) => {

  const menuOnClick = value => onClick(preDefinedFieldMap(value.key))
  const primaryKeyStyle = {color: 'rgba(114, 46, 209, 1)'}

  const menu = (
    <Menu onClick={menuOnClick}>
      <Menu.Item key='date' style={primaryKeyStyle}>
        <StarOutlined/> 日期
      </Menu.Item>
      <Menu.Item key='symbol' style={primaryKeyStyle}>
        <StarOutlined/> 代码
      </Menu.Item>
      <Menu.Item key='region' style={primaryKeyStyle}>
        <StarOutlined/> 地区
      </Menu.Item>
      <Menu.Item key='price'>
        价格
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button>添加预定义字段 <DownOutlined/></Button>
    </Dropdown>
  )
};
