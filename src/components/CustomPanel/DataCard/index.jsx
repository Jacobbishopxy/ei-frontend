/**
 * Created by Jacob Xie on 3/2/2020.
 */

import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './index.less'

const {confirm} = Modal;

const EmbedModal = props => {
  // const [embedLink, setEmbedLink] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //
  //   setTimeout(() => {
  //     setLoading(true)
  //   }, 2000)
  //
  // }, [visible]);


  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 2000)
  };

  const inputOnChange = e => {
    console.log(e)
  }


  return (
    <>
      <Button type='primary' size='small' onClick={() => setVisible(true)}>
        Open
      </Button>
      <Modal
        title="请在下方输入链接："
        visible={visible}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={() => setVisible(false)}
      >
        <Input placeholder='链接' allowClear onChange={inputOnChange}/>
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


const DataCard = ({onRemoveItem, embedLink}) => (
    <div className={styles.cardMain}>
      <div className={styles.cardHead}>
        <div>
          <EmbedModal/>
        </div>
        <Button
          shape='circle'
          size='small'
          onClick={() => confirmDelete(onRemoveItem)}
        >
          🗑️
        </Button>
      </div>
      <embed
        className={styles.cardContent}
        src={embedLink}
      />
    </div>
  );

export default DataCard;
