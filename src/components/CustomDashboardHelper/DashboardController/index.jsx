/**
 * Created by Jacob Xie on 3/4/2020.
 */

import React from 'react';
import { Button, Tooltip, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { AddModuleMenu } from '@/components/CustomDashboardHelper/ModulePanel';

import styles from './index.less'

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
