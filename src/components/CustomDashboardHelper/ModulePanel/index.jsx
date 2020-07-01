/**
 * Created by Jacob Xie on 3/2/2020.
 */

import React, { useRef, useState } from 'react';
import { Button, Input, message, Modal, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { Emoji } from '@/components/Emoji';
import { EmbedLinkContent } from '@/components/CustomDashboardHelper/ContentCollections/EmbedLinkContent';
import { TextEditorContent } from '@/components/CustomDashboardHelper/ContentCollections/TextEditorContent';

import styles from './index.less'


const selectModeToAdd = modeName => (initContent, saveContent, ref, headVisible) => {

  const contentStyles = headVisible ? styles.cardContent : styles.cardContentWithOutHead

  const defaultType = <EmbedLinkContent
    initContent={initContent}
    saveContent={saveContent}
    ref={ref}
    contentStyles={contentStyles}
  />;

  const textType = <TextEditorContent
    initContent={initContent}
    saveContent={saveContent}
    ref={ref}
    contentStyles={contentStyles}
  />;


  switch (modeName) {
    case 'embedLink':
      return defaultType;
    case 'table':
      return <h1>Table</h1>;
    case 'text':
      return textType;
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
  return title;
};


export const DataCard = ({onRemove, initContent, saveContent, headVisible}) => {

  const [title, setTitle] = useState(checkDataCardTitle(initContent.title));
  const [titleVisible, setTitleVisible] = useState(true);
  const [editOn, setEditOn] = useState(false);

  const contentRef = useRef(null);

  const changeTitle = ({target: {value}}) => {
    if (value !== '') {
      setTitle(value);
      saveContent({title: value});
    } else {
      message.warning('标题不可为空');
    }
    setTitleVisible(true);
  };

  const selectMode = selectModeToAdd(initContent.contentType);

  const editContent = () => {
    setEditOn(!editOn);
    contentRef.current.edit();
  };

  return (
    <div className={styles.cardMain}>
      {
        headVisible ? <div className={styles.cardHead}>
            <div>
              {titleVisible ?
                <Button type='link' size='small' onClick={() => setTitleVisible(false)}>
                  {title}
                </Button> :
                <Input
                  placeholder='请输入标题'
                  size='small'
                  allowClear
                  onPressEnter={changeTitle}
                  onBlur={changeTitle}
                />
              }
            </div>
            <Space>
              <Button
                shape='circle'
                size='small'
                type='link'
                ghost
                className='draggableZone'
              >
                <Emoji label="drag" symbol="🧲️️️️️"/>
              </Button>
              <Button
                shape='circle'
                size='small'
                type='link'
                ghost
                onClick={editContent}
              >
                {
                  editOn ?
                    <Emoji label="edit" symbol="❌️"/> :
                    <Emoji label="edit" symbol="⚙️"/>
                }
              </Button>
              <Button
                shape='circle'
                size='small'
                type='link'
                ghost
                onClick={() => confirmDelete(onRemove)}
              >
                <Emoji label="delete" symbol="🗑️️️"/>
              </Button>
            </Space>
          </div> :
          <></>
      }

      {/*<hr style={{margin: 0, borderColor: 'white'}}/>*/}
      {selectMode(initContent, saveContent, contentRef, headVisible)}
    </div>
  );
};

export default DataCard;
