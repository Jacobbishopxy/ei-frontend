/**
 * Created by Jacob Xie on 7/1/2020.
 */

import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Input, Modal, Table, Switch } from 'antd';
import Papa from 'papaparse';
import _ from 'lodash';

import styles from './Common.less';

const papaConfig = {
  skipEmptyLines: true,
  header: true,
  dynamicTyping: true
};

const EmbedModal = ({onSet, initContentData, initContentConfig}) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(initContentData);
  const [contentCfg, setContentCfg] = useState(initContentConfig);

  const handleOk = () => {
    onSet(content, contentCfg);
    setVisible(false);
  };

  const contentOnChange = ({target: {value}}) => {
    const parsedValue = Papa.parse(value, papaConfig).data
    setContent(JSON.stringify(parsedValue))
  };

  const contentCfgOnChange = (value) => {
    setContentCfg(JSON.stringify({showHeader: value}))
  };

  return (
    <>
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
        <Switch defaultChecked onChange={contentCfgOnChange}/> 是否显示表头
      </Modal>
    </>
  )
};


const generateTableColumn = data =>
  _.map(data[0], (v, k) => ({title: k, dataIndex: k}))

const generateTableData = data =>
  data.map((i, idx) => ({...i, key: idx}))

const ViewingTable = ({contentData, contentConfig}) => {
  const cd = JSON.parse(contentData);
  const tc = generateTableColumn(cd);
  const td = generateTableData(cd);

  const cc = contentConfig !== undefined ? JSON.parse(contentConfig) : {showHeader: true};

  return <Table
    columns={tc}
    dataSource={td}
    size='small'
    pagination={false}
    showHeader={cc.showHeader}
  />
};


const checkContentQueryLink = content => {
  if (content !== '') return content;
  return '';
};


export const EditableTableContent = forwardRef(({initContent, saveContent, contentStyles}, ref) => {
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState(checkContentQueryLink(initContent.contentData))
  const [contentCfg, setContentCfg] = useState(initContent.contentConfig)

  const onSet = (ct, cc) => {
    setContent(ct);
    setContentCfg(cc);
    saveContent({contentData: ct, contentConfig: cc});
  };

  useImperativeHandle(ref, () => ({
    edit: () => setEditable(!editable)
  }))

  return (
    <>
      {
        content === '' || editable ?
          <div className={styles.cardContentAlter}>
            <EmbedModal onSet={onSet} initContentData={content} initContentConfig={contentCfg}/>
          </div> :
          <ViewingTable
            className={contentStyles}
            contentData={content}
            contentConfig={contentCfg}
          />
      }
    </>
  )
});

export default EditableTableContent;

