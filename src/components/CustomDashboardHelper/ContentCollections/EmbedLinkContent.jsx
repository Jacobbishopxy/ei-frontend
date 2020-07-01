/**
 * Created by Jacob Xie on 3/6/2020.
 */


import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import styles from './Common.less';


const EmbedModal = ({onSet, initEmbedLink}) => {
  const [visible, setVisible] = useState(false);
  const [embedLink, setEmbedLink] = useState(initEmbedLink);

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
        title='请在下方输入链接：'
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <Input
          placeholder='链接'
          allowClear
          onBlur={inputOnchange}
          value={embedLink}
        />
      </Modal>
    </>
  );
};

const checkContentEmbedLink = embedLink => {
  if (embedLink !== '') return embedLink;
  return '';
};


export const EmbedLinkContent = forwardRef(({initContent, saveContent, contentStyles}, ref) => {
  const [editable, setEditable] = useState(false);
  const [embedLink, setEmbedLink] = useState(checkContentEmbedLink(initContent.hyperLink));

  const onSet = el => {
    setEmbedLink(el);
    saveContent({hyperLink: el});
  };

  useImperativeHandle(ref, () => ({
    edit: () => setEditable(!editable)
  }))

  return (
    <>
      {
        embedLink === '' || editable ?
          <div className={styles.cardContentAlter}>
            <EmbedModal onSet={onSet} initEmbedLink={embedLink}/>
          </div> :
          <embed
            className={contentStyles}
            src={embedLink}
          />
      }
    </>
  );
});

export default EmbedLinkContent;

