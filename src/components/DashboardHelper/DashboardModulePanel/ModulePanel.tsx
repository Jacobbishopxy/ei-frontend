/**
 * Created by Jacob Xie on 7/31/2020.
 */


import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, message, Modal, Space, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import * as dashboardModel from '@/utilities/dashboardModel';
import { Emoji } from '@/components/Emoji';
import { selectModuleToAdd } from './ModuleList';
import { ModulePanelProps } from './data';

import styles from './ModulePanel.less';

const confirmDelete = (onRemove: (value: string) => void) =>
  Modal.confirm({
    title: '是否删除该模块？',
    icon: <ExclamationCircleOutlined/>,
    okText: '是',
    okType: 'danger',
    cancelText: '否',
    onOk: onRemove
  });


export const ModulePanel = (props: ModulePanelProps) => {

  const contentRef = useRef<React.Ref<any>>();

  const [titleVisible, setTitleVisible] = useState<boolean>(true);
  const [editOn, setEditOn] = useState<boolean>(false);
  const [content, setContent] = useState<dashboardModel.Content | null>(props.content)

  const selectModule = selectModuleToAdd(props.category)

  useEffect(() => props.saveContent(content!), [content])

  const changeTitle = (e: any) => {
    const {value} = e.target;
    if (value !== '')
      setContent({...content!, title: value})
    else
      message.warning('标题不可为空')

    setTitleVisible(true);
  };

  const editContent = () => {
    setEditOn(!editOn);
    // @ts-ignore
    contentRef.current.edit();
  }


  const panelHead = (
    <div className={styles.cardHead}>
      {
        titleVisible ?
          <Button
            type='link'
            size='small'
            onClick={() => setTitleVisible(false)}
          >
            {props.content?.title}
          </Button> :
          <Input
            placeholder='请输入标题'
            size='small'
            allowClear
            onPressEnter={changeTitle}
            onBlur={changeTitle}
          />
      }
      <Space>
        <Tooltip title='拖拽'>
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
            onClick={() => confirmDelete(props.onRemove)}
          >
            <Emoji label="delete" symbol="🗑️️️"/>
          </Button>
        </Tooltip>
      </Space>
    </div>
  );

  return (
    <div className={styles.cardMain}>
      {props.headVisible ? panelHead : <></>}

      {selectModule(props.content!, props.saveContent, props.headVisible, contentRef)}
    </div>
  );
};

