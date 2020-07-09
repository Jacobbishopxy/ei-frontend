/**
 * Created by Jacob Xie on 3/4/2020.
 */

import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { AddModuleMenu } from '@/components/CustomDashboardHelper/DashboardModulePanel';

export const DashboardEditor = ({onAddModule, onSaveModule, onEditModule}) => {

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    onEditModule(edit);
  }, [edit]);

  const startEdit = () => setEdit(true);

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
    <>
      {
        edit ?
          <div>
            <Dropdown overlay={addModuleMenu}>
              <Button
                type='primary'
                size='small'
                style={{marginRight: 5}}
              >
                添加模块 <DownOutlined/>
              </Button>
            </Dropdown>
            <Button
              onClick={quitEdit}
              type='danger'
              size='small'
              style={{marginRight: 5}}
            >
              退出编辑
            </Button>
          </div> :
          <Button
            onClick={startEdit}
            type='primary'
            size='small'
            style={{marginRight: 5}}
          >
            编辑
          </Button>
      }
    </>
  )
};

export default DashboardEditor;
