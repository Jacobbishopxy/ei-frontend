/**
 * Created by Jacob Xie on 3/2/2020.
 */

import React, { useState } from 'react';
import { Button, Input, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './index.less'

const confirmDelete = onRemove =>
  Modal.confirm({
    title: '是否删除该模块？',
    icon: <ExclamationCircleOutlined/>,
    okText: '是',
    okType: 'danger',
    cancelText: '否',
    onOk: onRemove
  });


const DataCard = ({onRemoveItem, cardContent}) => {

  const [title, setTitle] = useState('点击修改标题');
  const [titleVisible, setTitleVisible] = useState(true);

  const changeTitle = e => {
    const input = e.target.value;
    if (input !== '') {
      setTitle(e.target.value);
    } else {
      message.warning('标题不可为空')
    }
    setTitleVisible(true);
  };

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
            🧲
          </Button>
          <Button
            shape='circle'
            size='small'
            onClick={() => confirmDelete(onRemoveItem)}
          >
            🗑️
          </Button>
        </div>
      </div>
      <hr style={{margin: 0, borderColor: 'white'}}/>
      {cardContent}
    </div>
  );
};

export default DataCard;
