/**
 * Created by Jacob Xie on 3/4/2020.
 */

import React, { useState } from 'react';
import { Button, Dropdown, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { AddModuleMenu } from '@/components/CustomDashboardHelper/ModulePanel';

import styles from './index.less'


export const ControlCard = ({onAddModule, onSaveModule, onEditModule}) => {

  const [edit, setEdit] = useState(false);

  const startEdit = () => {
    onEditModule();
    setEdit(true);
  };

  const quitEdit = () =>
    Modal.confirm({
      title: '是否保存编辑结果？',
      content: '所有改动将保存于服务器',
      onOk() {
        onSaveModule();
        setEdit(false);
      },
      onCancel() {
        setEdit(false);
      },
      okText: '是',
      cancelText: '否'
    });

  const addModuleMenu = <AddModuleMenu onAddModule={onAddModule}/>;

  return (
    <div className={styles.controlMain}>
      <div className={styles.controlContent}/>
      <div className={styles.controlContent}>
        <div>
          {
            edit ?
              <>
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
                  onClick={quitEdit}
                  type='danger'
                  size='small'
                  style={{marginRight: 10}}
                >
                  退出编辑
                </Button>
              </> :
              <Button
                onClick={startEdit}
                type='primary'
                size='small'
                style={{marginRight: 10}}
              >
                编辑
              </Button>
          }
        </div>
      </div>
    </div>
  );
};

export default ControlCard;
