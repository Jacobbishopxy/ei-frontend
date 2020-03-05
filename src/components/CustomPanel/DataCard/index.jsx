/**
 * Created by Jacob Xie on 3/2/2020.
 */

import React, { useState } from 'react';
import { Button, Input, message, Modal } from 'antd';
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
      <Button type='primary' shape='round' size='small' onClick={() => setVisible(true)}>
        点此输入链接
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

  const [embedLink, setEmbedLink] = useState(null);
  const [title, setTitle] = useState('点击修改标题');
  const [titleVisible, setTitleVisible] = useState(true);

  const changeTitle = e => {
    const input = e.target.value;
    if (input !== "") {
      setTitle(e.target.value);
    } else {
      message.warning("标题不可为空")
    }
    setTitleVisible(true);
  };

  return (
    <div className={styles.cardMain}>
      <div className={styles.cardHead}>
        <div>
          {titleVisible ?
            <Button
              type='link'
              size='small'
              onClick={() => setTitleVisible(false)}
            >
              {title}
            </Button> :
            <Input placeholder='请输入标题' size='small' allowClear onPressEnter={changeTitle} onBlur={changeTitle}/>
          }
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
          <div className={styles.cardContentAlter}>
            <EmbedModal onSet={setEmbedLink}/>
          </div> :
          <embed
            className={styles.cardContent}
            src={embedLink}
          />
      }
    </div>
  );
};

export default DataCardMain;
