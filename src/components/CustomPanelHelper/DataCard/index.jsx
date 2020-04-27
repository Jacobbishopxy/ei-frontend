/**
 * Created by Jacob Xie on 3/2/2020.
 */

import React, { useState } from 'react';
import { Button, Input, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { EmbedLinkContent } from '@/components/CustomPanelHelper/EmbedLinkContent';
import { Emoji } from '@/components/Emoji';

import styles from './index.less'


const selectModeToAdd = modeName => (cardContent, saveContentCfg) => {

  const defaultType = <EmbedLinkContent
    cardContent={cardContent}
    saveContentCfg={saveContentCfg}
  />;

  switch (modeName) {
    case 'embedLink':
      return defaultType;
    case 'table':
      return <h1>Table</h1>;
    case 'text':
      return <h1>Text</h1>;
    case 'image':
      return <h1>Img</h1>;
    default:
      return defaultType;
  }
};


const confirmDelete = onRemove =>
  Modal.confirm({
    title: '是否删除该模块？',
    icon: <ExclamationCircleOutlined/>,
    okText: '是',
    okType: 'danger',
    cancelText: '否',
    onOk: onRemove
  });


const checkDataCardTitle = title => {
  if (title === '') return '请输入标题';
  return title
};


export const DataCard = ({onRemoveItem, cardContent, saveContentCfg}) => {

  const [title, setTitle] = useState(checkDataCardTitle(cardContent.title));
  const [titleVisible, setTitleVisible] = useState(true);

  const changeTitle = ({target: {value}}) => {
    if (value !== '') {
      setTitle(value);
      saveContentCfg({title: value})
    } else {
      message.warning('标题不可为空')
    }
    setTitleVisible(true);
  };

  const selectMode = selectModeToAdd(cardContent.contentType)

  return (
    <div className={styles.cardMain}>
      <div className={styles.cardHead}>
        <div>
          {titleVisible ?
            <Button type='link' size='small' onClick={() => setTitleVisible(false)}>
              {title}
            </Button> :
            <Input placeholder='请输入标题' size='small' allowClear onPressEnter={changeTitle} onBlur={changeTitle}/>
          }
        </div>
        <div>
          <Button
            shape='circle'
            size='small'
            className='draggableZone'
            style={{marginRight: 10}}
          >
            <Emoji label="drag" symbol="🧲"/>
          </Button>
          <Button
            shape='circle'
            size='small'
            onClick={() => confirmDelete(onRemoveItem)}
          >
            <Emoji label="delete" symbol="🗑️"/>
          </Button>
        </div>
      </div>
      <hr style={{margin: 0, borderColor: 'white'}}/>
      {selectMode(cardContent, saveContentCfg)}
    </div>
  );
};

export default DataCard;
