/**
 * Created by Jacob Xie on 4/28/2020.
 */

import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import styles from './Common.less';


const EmbedModal = ({onSet, initQueryLink, initQueryParam}) => {
  const [visible, setVisible] = useState(false);
  const [queryLink, setQueryLink] = useState(initQueryLink);
  const [queryParam, setQueryParam] = useState(initQueryParam);

  const handleOk = () => {
    onSet(queryLink, queryParam);
    setVisible(false);
  };

  const linkOnChange = ({target: {value}}) => setQueryLink(value);
  const paramOnChange = ({target: {value}}) => setQueryParam(value);

  return (
    <>
      <Button
        type='primary'
        shape='round'
        size='small'
        onClick={() => setVisible(true)}
      >
        点此输入参数
      </Button>
      <Modal
        title='请在下方输入参数：'
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <Input
          placeholder='查询API'
          allowClear
          onBlur={linkOnChange}
          value={queryLink}
        />
        <Input.TextArea
          placeholder='条件语句'
          rows={5}
          allowClear
          onBlur={paramOnChange}
          value={queryParam}
        />
      </Modal>
    </>
  )
};


// todo: fetch data and receive JSON value
const ViewingTable = ({queryLink, queryParam}) => {
  return (
    <p>here is the table</p>
  )
};


const checkContentQueryLink = queryLink => {
  if (queryLink !== '') return queryLink;
  return '';
};

const checkContentQueryParam = queryParam => {
  if (queryParam !== undefined) return queryParam;
  return undefined;
};

export const TableContent = forwardRef(({initContent, saveContent}, ref) => {
  const [editable, setEditable] = useState(false);
  const [queryLink, setQueryLink] = useState(checkContentQueryLink(initContent.hyperLink))
  const [queryParam, setQueryParam] = useState(checkContentQueryParam(initContent.contentConfig));

  const onSet = (ql, qp) => {
    setQueryLink(ql);
    setQueryParam(qp);
    saveContent({hyperLink: ql, contentConfig: qp});
  };

  useImperativeHandle(ref, () => ({
    edit: () => setEditable(!editable)
  }))

  return (
    <>
      {
        queryLink === '' || editable ?
          <div className={styles.cardContentAlter}>
            <EmbedModal onSet={onSet} initQueryLink={queryLink} initQueryParam={queryParam}/>
          </div> :
          <ViewingTable queryLink={queryLink} queryParam={queryParam}/>
      }
    </>
  )
});

export default TableContent;

