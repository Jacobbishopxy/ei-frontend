/**
 * Created by Jacob Xie on 3/4/2020.
 */

import React from 'react';
import { Button, Input, Tooltip, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import styles from './index.less'


const AddModuleMenu = ({onAddModule}) => (
  <Menu onClick={onAddModule}>
    <Menu.Item key="embedLink">链接</Menu.Item>
    <Menu.Item key="table">表格</Menu.Item>
    <Menu.Item key="text">文字</Menu.Item>
    <Menu.Item key="image">图片</Menu.Item>
  </Menu>
);

export const ControlCard = ({onAddModule, onSaveModule, onEditModule}) => {
  const addModuleMenu = <AddModuleMenu onAddModule={onAddModule}/>;
  return (
    <div className={styles.controlMain}>
      <div className={styles.controlContent}/>
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
          <Button
            onClick={onEditModule}
            type='primary'
            size='small'
            style={{marginRight: 10}}
          >
            编辑模板
          </Button>
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
};

export default ControlCard;
