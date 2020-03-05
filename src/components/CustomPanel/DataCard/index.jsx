/**
 * Created by Jacob Xie on 3/2/2020.
 */

import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './index.less'

const {confirm} = Modal;

const EmbedModal = ({onSet}) => {
  const [visible, setVisible] = useState(false);
  const [embedLink, setEmbedLink] = useState('');

  const handleOk = () => {
    onSet(embedLink);
    setVisible(false);
  };

  const inputOnchange = e => setEmbedLink(e.target.value);

  return (
    <>
      <Button type='primary' size='small' onClick={() => setVisible(true)}>
        Open
      </Button>
      <Modal
        title="请在下方输入链接："
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <Input placeholder='链接' allowClear onChange={inputOnchange}/>
      </Modal>
    </>
  );
};

const confirmDelete = onRemove => (
  confirm({
    title: '是否删除该模块？',
    icon: <ExclamationCircleOutlined/>,
    okText: '是',
    okType: 'danger',
    cancelText: '否',
    onOk: onRemove
  })
);


const DataCardMain = ({onRemoveItem}) => {

  const [embedLink, setEmbedLink] = useState(() => null);

  return (
    <div className={styles.cardMain}>
      <div className={styles.cardHead}>
        <div>
          <EmbedModal onSet={setEmbedLink}/>
        </div>
        <Button
          shape='circle'
          size='small'
          onClick={() => confirmDelete(onRemoveItem)}
        >
          🗑️
        </Button>
      </div>
      {
        embedLink == null ?
          <p>请输入链接</p> :
          <embed
            className={styles.cardContent}
            src={embedLink}
          />
      }
    </div>
  );
};

export default DataCardMain;
