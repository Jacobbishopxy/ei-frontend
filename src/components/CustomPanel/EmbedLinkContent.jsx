/**
 * Created by Jacob Xie on 3/6/2020.
 */


import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import styles from './EmbedLinkContent.less';


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

const EmbedLinkContent = () => {
  const [embedLink, setEmbedLink] = useState(null);
  return (
    <>
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
    </>
  );
};

export default EmbedLinkContent;

