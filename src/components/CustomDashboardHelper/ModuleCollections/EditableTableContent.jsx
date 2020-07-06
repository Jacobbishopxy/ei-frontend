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


const defaultInitContentConfig = content => {
  if (content !== undefined) return JSON.parse(content);
  return {showHeader: true, pagination: false};
}

const EmbedModal = ({onSet, initContentConfig}) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState([]);
  const [contentCfg, setContentCfg] = useState(defaultInitContentConfig(initContentConfig));

  const handleOk = () => {
    onSet(JSON.stringify(content), JSON.stringify(contentCfg));
    setVisible(false);
  };

  const contentOnChange = ({target: {value}}) => {
    const parsedValue = Papa.parse(value, papaConfig).data
    setContent(parsedValue)
  };

  const showHeader = value => setContentCfg({...contentCfg, showHeader: value});
  const pagination = value => setContentCfg({...contentCfg, pagination: value});

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
        <Switch checked={contentCfg.showHeader} onChange={showHeader}/> 是否显示表头
        <br/>
        <Switch checked={contentCfg.pagination} onChange={pagination}/> 是否显示页数
      </Modal>
    </>
  )
};

// todo: render column to enable custom data presence
const generateTableColumn = data =>
  _.map(data[0], (v, k) => ({title: k, dataIndex: k}))

const generateTableData = data =>
  data.map((i, idx) => ({...i, key: idx}))

const ViewingTable = ({contentData, contentConfig}) => {
  const cd = JSON.parse(contentData);
  const tc = generateTableColumn(cd);
  const td = generateTableData(cd);

  const cc = contentConfig === undefined ?
    {showHeader: true, pagination: false} :
    JSON.parse(contentConfig)

  return <Table
    columns={tc}
    dataSource={td}
    size='small'
    pagination={cc.pagination}
    showHeader={cc.showHeader}
  />
};


const checkContent = content => {
  if (content !== '') return content;
  return '';
};

const checkContentCfg = content => {
  if (content !== undefined) return content;
  return undefined;
}


export const EditableTableContent = forwardRef(({initContent, saveContent, contentStyles}, ref) => {
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState(checkContent(initContent.contentData));
  const [contentCfg, setContentCfg] = useState(checkContentCfg(initContent.contentConfig));

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
            <EmbedModal
              onSet={onSet}
              initContentConfig={contentCfg}
            />
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

