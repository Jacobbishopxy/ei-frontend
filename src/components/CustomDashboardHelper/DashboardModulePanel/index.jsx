/**
 * Created by Jacob Xie on 3/2/2020.
 */

import React, { useRef, useState } from 'react';
import { Button, Input, Menu, message, Modal, Space, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { Emoji } from '@/components/Emoji';
import { EmbedLinkContent } from '@/components/CustomDashboardHelper/ModuleCollections/EmbedLinkContent';
import { TextEditorContent } from '@/components/CustomDashboardHelper/ModuleCollections/TextEditorContent';
import { EditableTableContent } from '@/components/CustomDashboardHelper/ModuleCollections/EditableTableContent';
import { ListFileContent } from '@/components/CustomDashboardHelper/ModuleCollections/ListFileContent';
import { ProFileContent } from '@/components/CustomDashboardHelper/ModuleCollections/ProFileContent';

import styles from './index.less';


export const AddModuleMenu = ({onAddModule}) => (
  <Menu onClick={onAddModule}>
    <Menu.Item key="embedLink">链接</Menu.Item>
    <Menu.Item key="table">表格</Menu.Item>
    <Menu.Item key="editableTable">可编辑表格</Menu.Item>
    <Menu.Item key="text">文字</Menu.Item>
    <Menu.Item key="listFile">文件概览</Menu.Item>
    <Menu.Item key="proFile">文件管理</Menu.Item>
    <Menu.Item key="image">图片</Menu.Item>
  </Menu>
);


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
  const editableTableContent = <EditableTableContent
    initContent={initContent}
    saveContent={saveContent}
    ref={ref}
    contentStyles={contentStyles}
  />
  const listFileContent = <ListFileContent
    initContent={initContent}
    saveContent={saveContent}
    ref={ref}
    contentStyles={contentStyles}
  />
  const proFileContent = <ProFileContent
    initContent={initContent}
    saveContent={saveContent}
    ref={ref}
    contentStyles={contentStyles}
  />


  switch (modeName) {
    case 'embedLink':
      return defaultType;
    case 'table':
      return <h1>Table</h1>;
    case 'editableTable':
      return editableTableContent;
    case 'text':
      return textType;
    case 'image':
      return <h1>Img</h1>;
    case 'listFile':
      return listFileContent;
    case 'proFile':
      return proFileContent;
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


// todo: 外部参数，如symbol/date ...
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
              <Tooltip title="拖拽">
                <Button
                  shape='circle'
                  size='small'
                  type='link'
                  className='draggableZone'
                >
                  <Emoji label="drag" symbol="🧲️️️️️"/>
                </Button>
              </Tooltip>
              <Tooltip title="编辑">
                <Button
                  shape='circle'
                  size='small'
                  type='link'
                  onClick={editContent}
                >
                  {
                    editOn ?
                      <Emoji label="edit" symbol="❌️"/> :
                      <Emoji label="edit" symbol="⚙️"/>
                  }
                </Button>
              </Tooltip>
              <Tooltip title="删除">
                <Button
                  shape='circle'
                  size='small'
                  type='link'
                  onClick={() => confirmDelete(onRemove)}
                >
                  <Emoji label="delete" symbol="🗑️️️"/>
                </Button>
              </Tooltip>
            </Space>
          </div> :
          <></>
      }

      {selectMode(initContent, saveContent, contentRef, headVisible)}
    </div>
  );
};

export default DataCard;
