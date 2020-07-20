/**
 * Created by Jacob Xie on 3/4/2020.
 */

import React, { useState, useEffect } from 'react';
import { Button, Card, Divider, Input, List, Modal, Space, Tabs } from 'antd';

import { moduleList } from '@/components/CustomDashboardHelper/DashboardModulePanel/moduleList';

import styles from './Common.less';


const ModuleSelectionView = ({onSelectModule}) => (
  <>
    {moduleList.map(chunk => (
      <div key={chunk.key}>
        <Divider orientation="left">{chunk.name}</Divider>
        <List
          grid={{gutter: 24, column: 4}}
          size='large'
          dataSource={chunk.children}
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
      </div>
    ))}
  </>
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
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="模块方案" key="1">
          <ModuleSelectionView onSelectModule={onSelectModule}/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="空模板" key="2">
          Template selection
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

const ConfirmSaveModal = ({onSaveModule, template, onSaveTemplate, visible, onOk, onCancel}) => {

  const [templateName, setTemplateName] = useState(template);

  const inputBlur = ({target: {value}}) => setTemplateName(value);
  const buttonClick = () => onSaveTemplate(templateName);

  return (
    <Modal
      title='保存编辑结果'
      visible={visible}
      onCancel={onCancel}
      footer={<Button onClick={onOk}>确认退出编辑</Button>}
    >
      <Space direction="vertical">
        <Space>
          保存模板：
          <Input
            defaultValue={templateName}
            onBlur={inputBlur}
            style={{width: 200}}
            disabled
          />
          <Button
            onClick={buttonClick}
            disabled
          >
            确认
          </Button>
        </Space>
        <br/>
        <Space>
          保存布局：
          <Button
            type='primary'
            onClick={onSaveModule}
          >
            确认
          </Button>
        </Space>
      </Space>
    </Modal>
  );
}


// todo: add save dashboard as template
export const DashboardEditor = ({onAddModule, onSaveModule, onEditModule}) => {

  const [edit, setEdit] = useState(false);
  const [addModuleModalVisible, setAddModuleModalVisible] = useState(false);
  const [confirmSaveModalVisible, setConfirmSaveModalVisible] = useState(false);

  useEffect(() => {
    onEditModule(edit);
  }, [edit]);

  const startEdit = () => setEdit(true);

  const quitEdit = () => {
    setConfirmSaveModalVisible(false);
    setEdit(false);
  };


  return (
    <>
      {
        edit ?
          <div>
            <Button
              type='primary'
              size='small'
              style={{marginRight: 5}}
              onClick={() => setAddModuleModalVisible(true)}
            >
              添加模块
            </Button>
            <Button
              onClick={() => setConfirmSaveModalVisible(true)}
              type='danger'
              size='small'
              style={{marginRight: 5}}
            >
              退出编辑
            </Button>

            <AddModuleModal
              onAddModule={onAddModule}
              onOk={() => setAddModuleModalVisible(false)}
              onCancel={() => setAddModuleModalVisible(false)}
              visible={addModuleModalVisible}
            />

            <ConfirmSaveModal
              onSaveModule={onSaveModule}
              template="dev"
              onSaveTemplate={t => console.log(`on save template: ${t}`)}
              visible={confirmSaveModalVisible}
              onOk={quitEdit}
              onCancel={() => setConfirmSaveModalVisible(false)}
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
  );
};

export default DashboardEditor;
