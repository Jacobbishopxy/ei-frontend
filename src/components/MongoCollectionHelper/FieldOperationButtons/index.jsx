/**
 * Created by Jacob Xie on 4/13/2020.
 */

import React from 'react';
import { Button, Dropdown, Menu, Space } from 'antd';
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


export default ({disableClick, onClickNewField, onClickPreDefined}) => {

  const menuOnClick = value => onClickPreDefined(preDefinedFieldMap(value.key))
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
    <Space>
      <Button
        type="primary"
        onClick={onClickNewField}
        style={{width: 150}}
        disabled={disableClick}
      >
        添加新字段
      </Button>
      <Dropdown
        overlay={menu}
        disabled={disableClick}
      >
        <Button style={{width: 150}}>预定义字段 <DownOutlined/></Button>
      </Dropdown>
    </Space>
  )
};
