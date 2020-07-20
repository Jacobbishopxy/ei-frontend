/**
 * Created by Jacob Xie on 3/2/2020.
 */

import React, { useRef, useState } from 'react';
import { Button, Input, message, Modal, Space, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Emoji } from '@/components/Emoji';
import { selectModeToAdd } from './moduleList';

import styles from './index.less';

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
