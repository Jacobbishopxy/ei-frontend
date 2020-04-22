/**
 * Created by Jacob Xie on 4/16/2020.
 */

import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const ModalTitle = ({ifCreate}) => {
  const text = ifCreate ?
    <>确认<span style={{color: 'red'}}>新建表</span>字段明细提交</> :
    <>确认<span style={{color: 'green'}}>修改表</span>字段明细提交</>

  return (
    <Space>
      <ExclamationCircleOutlined style={{color: 'orange'}}/> <div>{text}</div>
    </Space>
  )
}

export default ({presentView, ifCreate, onPreSubmit, onSubmit}) => {

  const [visible, setVisible] = useState(false);

  const buttonOnClick = () => {
    onPreSubmit();
    setVisible(true);
  }

  const modalOnOk = () => {
    onSubmit();
    setVisible(false);
  }

  return (
    <div>
      <Button
        type='primary'
        onClick={buttonOnClick}
      >
        提交
      </Button>

      <Modal
        visible={visible}
        title={<ModalTitle ifCreate={ifCreate}/>}
        onOk={modalOnOk}
        onCancel={() => setVisible(false)}
        okText="确认"
        cancelText="取消"
      >
        <pre>
          {JSON.stringify(presentView, null, 2)}
        </pre>
      </Modal>
    </div>
  )
}