/**
 * Created by Jacob Xie on 3/6/2020.
 */


import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import ContentGenerator from '@/components/CustomDashboardHelper/ModuleCollections/ContentGenerator';


const InputModal = ({onSet, contentData, contentStyles}) => {
  const [visible, setVisible] = useState(false);
  const [embedLink, setEmbedLink] = useState(contentData);

  const handleOk = () => {
    onSet(embedLink);
    setVisible(false);
  };

  const inputOnchange = ({target: {value}}) => setEmbedLink(value);

  return (
    <div className={contentStyles}>
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
          defaultValue={embedLink}
        />
      </Modal>
    </div>
  );
};

const ViewingEmbed = ({contentData, contentStyles}) => <embed
  className={contentStyles}
  src={contentData}
/>

export const EmbedLinkContent = ContentGenerator(InputModal, ViewingEmbed)

export default EmbedLinkContent;

