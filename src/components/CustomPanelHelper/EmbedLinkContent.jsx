/**
 * Created by Jacob Xie on 3/6/2020.
 */


import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import styles from './Common.less';


const EmbedModal = ({onSet}) => {
  const [visible, setVisible] = useState(false);
  const [embedLink, setEmbedLink] = useState('');

  const handleOk = () => {
    onSet(embedLink);
    setVisible(false);
  };

  const inputOnchange = ({target: {value}}) => setEmbedLink(value);

  return (
    <>
      <Button
        type='primary'
        shape='round'
        size='small'
        onClick={() => setVisible(true)}
      >
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

const checkContentEmbedLink = embedLink => {
  if (embedLink !== '') return embedLink;
  return '';
};

export const EmbedLinkContent = ({cardContent, saveContentCfg}) => {
  const [embedLink, setEmbedLink] = useState(checkContentEmbedLink(cardContent.hyperLink));

  const onSet = el => {
    setEmbedLink(el);
    saveContentCfg({hyperLink: el});
  };

  return (
    <>
      {
        embedLink === '' ?
          <div className={styles.cardContentAlter}>
            <EmbedModal onSet={onSet}/>
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

