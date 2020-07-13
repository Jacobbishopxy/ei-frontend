/**
 * Created by Jacob Xie on 7/1/2020.
 */

import React, { useState } from 'react';
import { Button, Input, Modal, Table, Switch, Upload, message } from 'antd';
import Papa from 'papaparse';
import _ from 'lodash';
import ContentGenerator from '@/components/CustomDashboardHelper/ModuleCollections/ContentGenerator';
import { InboxOutlined } from '@ant-design/icons';

import styles from './Common.less';

const papaConfig = {
  skipEmptyLines: true,
  header: true,
  dynamicTyping: true
};

const defaultInitContentConfig = content => {
  if (content !== undefined) return JSON.parse(content);
  return {showHeader: true, pagination: false};
};

const uploadProps = {
  name: 'file',
  multiple: true,
  action: '...',
  onChange(info) {
    const {status} = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  disabled: true
};

// todo: use initContent and render as Table?
const InputField = ({onSet, contentConfig, contentStyles}) => {
  const [visible, setVisible] = useState(false);
  const [contentD, setContentD] = useState([]);
  const [contentC, setContentC] = useState(defaultInitContentConfig(contentConfig));

  const handleOk = () => {
    onSet(JSON.stringify(contentD), JSON.stringify(contentC));
    setVisible(false);
  };

  const contentOnChange = ({target: {value}}) => {
    const parsedValue = Papa.parse(value, papaConfig).data
    setContentD(parsedValue)
  };

  const showHeader = value => setContentC({...contentC, showHeader: value});
  const pagination = value => setContentC({...contentC, pagination: value});

  return (
    <div className={contentStyles}>
      <Button
        type='primary'
        shape='round'
        size='small'
        onClick={() => setVisible(true)}
      >
        点此转换表格
      </Button>
      <Modal
        title='请在下方输入数据：'
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <Input.TextArea
          placeholder='在此黏贴数据'
          rows={5}
          allowClear
          onBlur={contentOnChange}
        />
        <Upload.Dragger {...uploadProps} className={styles.uploadDraggerZone}>
          <p className="ant-upload-drag-icon"><InboxOutlined/></p>
          <p className="ant-upload-text">点击或拖拽文件</p>
        </Upload.Dragger>
        <Switch checked={contentC.showHeader} onChange={showHeader}/> 是否显示表头
        <br/>
        <Switch checked={contentC.pagination} onChange={pagination}/> 是否显示页数
      </Modal>
    </div>
  )
};

// todo: render column to enable custom data presence
const generateTableColumn = data =>
  _.map(data[0], (v, k) => ({title: k, dataIndex: k}))

const generateTableData = data =>
  data.map((i, idx) => ({...i, key: idx}))

const DisplayField = ({contentData, contentConfig, contentStyles}) => {
  const cd = JSON.parse(contentData);
  const tc = generateTableColumn(cd);
  const td = generateTableData(cd);

  const cc = contentConfig === undefined ?
    {showHeader: true, pagination: false} :
    JSON.parse(contentConfig)

  return <div className={contentStyles}>
    <Table
      columns={tc}
      dataSource={td}
      size='small'
      pagination={cc.pagination}
      showHeader={cc.showHeader}
    />
  </div>
};


export const EditableTableContent = ContentGenerator(InputField, DisplayField)

export default EditableTableContent;

