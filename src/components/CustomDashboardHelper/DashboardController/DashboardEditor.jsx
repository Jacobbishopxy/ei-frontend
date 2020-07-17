/**
 * Created by Jacob Xie on 3/4/2020.
 */

import React, { useState, useEffect } from 'react';
import { Button, Card, List, Modal } from 'antd';

import { moduleSelection } from '@/components/CustomDashboardHelper/DashboardModulePanel';

import styles from './Common.less';

const AddModuleSelection = ({onSelectModule}) => (
  <List
    grid={{gutter: 24, column: 6}}
    dataSource={moduleSelection}
    renderItem={item => (
      <List.Item>
        <label className={styles.moduleSelectionLabel}>
          <input type="radio" name="radio-name" disabled={item.disabled}/>
          <div>
            <Card
              onClick={() => onSelectModule(item.key)}
              className={item.disabled ? styles.selectionCardDisabled : styles.selectionCard}
            >
              {item.name}
            </Card>
          </div>
        </label>
      </List.Item>
    )}
  />
);


const AddModuleModal = ({onAddModule, visible, onOk, onCancel}) => {

  const [selected, setSelected] = useState(null);

  const onSelectModule = value => setSelected(value);
  const onSetOk = () => {
    onOk();
    onAddModule(selected);
  };

  return (
    <Modal
      title="请选择需要添加的模块"
      visible={visible}
      onOk={onSetOk}
      onCancel={onCancel}
      okText="确定"
      cancelText="取消"
      width="60%"
    >
      <AddModuleSelection onSelectModule={onSelectModule}/>
    </Modal>
  )
};


// todo: add save dashboard as template
export const DashboardEditor = ({onAddModule, onSaveModule, onEditModule}) => {

  const [edit, setEdit] = useState(false);
  const [visible, setVisible] = useState(false);

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

  return (
    <>
      {
        edit ?
          <div>
            <Button
              type='primary'
              size='small'
              style={{marginRight: 5}}
              onClick={() => setVisible(true)}
            >
              添加模块
            </Button>
            <Button
              type='primary'
              size='small'
              style={{marginRight: 5}}
              disabled
            >
              保存模板
            </Button>
            <Button
              onClick={quitEdit}
              type='danger'
              size='small'
              style={{marginRight: 5}}
            >
              退出编辑
            </Button>

            <AddModuleModal
              onAddModule={onAddModule}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              visible={visible}
            />
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
