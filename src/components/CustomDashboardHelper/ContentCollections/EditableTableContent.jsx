/**
 * Created by Jacob Xie on 7/1/2020.
 */

import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Input, Modal, Table } from 'antd';
import Papa from 'papaparse';
import _ from 'lodash';

import styles from './Common.less';

const papaConfig = {
  skipEmptyLines: true,
  header: true,
  dynamicTyping: true
};

const EmbedModal = ({onSet, initContentData}) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(initContentData);

  const handleOk = () => {
    onSet(content);
    setVisible(false);
  };

  const contentOnChange = ({target: {value}}) => {
    const parsedValue = Papa.parse(value, papaConfig).data
    setContent(JSON.stringify(parsedValue))
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
          placeholder='在此黏贴'
          rows={5}
          allowClear
          onBlur={contentOnChange}
        />
      </Modal>
    </>
  )
};


const generateTableColumn = data =>
  _.map(data[0], (v, k) => ({title: k, dataIndex: k}))

const generateTableData = data =>
  data.map((i, idx) => ({...i, key: idx}))

const ViewingTable = ({contentData}) => {
  const cd = JSON.parse(contentData);
  const tc = generateTableColumn(cd);
  const td = generateTableData(cd);

  return <Table
    columns={tc}
    dataSource={td}
    size='small'
    pagination={false}
  />
};


const checkContentQueryLink = content => {
  if (content !== '') return content;
  return '';
};


export const EditableTableContent = forwardRef(({initContent, saveContent, contentStyles}, ref) => {
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState(checkContentQueryLink(initContent.contentData))

  const onSet = (ct) => {
    setContent(ct);
    saveContent({contentData: ct});
  };

  useImperativeHandle(ref, () => ({
    edit: () => setEditable(!editable)
  }))

  return (
    <>
      {
        content === '' || editable ?
          <div className={styles.cardContentAlter}>
            <EmbedModal onSet={onSet} initContentData={content}/>
          </div> :
          <ViewingTable
            className={contentStyles}
            contentData={content}
          />
      }
    </>
  )
});

export default EditableTableContent;

