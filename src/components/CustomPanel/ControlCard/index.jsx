/**
 * Created by Jacob Xie on 3/4/2020.
 */

import React from 'react';
import { Button, Input, Select, DatePicker, Tooltip, Menu, Dropdown } from 'antd';

import styles from './index.less'
import { DownOutlined } from '@ant-design/icons';


const AddModuleMenu = ({onAddModule}) => (
  <Menu onClick={onAddModule}>
    <Menu.Item key="embedLink">链接</Menu.Item>
    <Menu.Item key="text">文字</Menu.Item>
    <Menu.Item key="image">图片</Menu.Item>
  </Menu>
);

const ControlCard = ({
                       onSelectSymbol,
                       onSelectDate,
                       onAddModule,
                       onSaveModule
                     }) => {
  const addModuleMenu = <AddModuleMenu onAddModule={onAddModule}/>;
  return (
    <div className={styles.controlMain}>
      <div className={styles.controlContent}>
        <Input
          onPressEnter={onSelectSymbol}
          onBlur={onSelectSymbol}
          placeholder='选择股票'
          size='small'
          style={{width: 120, marginRight: 10}}
        />
        <DatePicker
          onChange={onSelectDate}
          format='YYYY-M-DD'
          picker='week'
          size='small'
          placeholder='选择日期'
          style={{marginRight: 10}}
        />
      </div>
      <div className={styles.controlContent}>
        <div>
          <Dropdown overlay={addModuleMenu}>
            <Button
              type='primary'
              size='small'
              style={{marginRight: 10}}
            >
              添加模板 <DownOutlined/>
            </Button>
          </Dropdown>
          <Tooltip title='布局将保存于服务器'>
            <Button
              onClick={onSaveModule}
              type='primary'
              size='small'
              style={{marginRight: 10}}
            >
              保存布局
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default ControlCard;
