/**
 * Created by Jacob Xie on 7/10/2020.
 */

import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, Select, Space } from 'antd';
import { getFolderStructure } from '@/services/eiFile';
import ContentGenerator from '@/components/CustomDashboardHelper/ModuleCollections/ContentGenerator';


const defaultInitContentConfig = content => {
  if (content !== undefined) return JSON.parse(content);
  return {type: 'bank'};
}

const InputField = ({onSet, contentData, contentConfig, contentStyles}) => {
  const [visible, setVisible] = useState(false);
  const [contentD, setContentD] = useState(contentData);
  const [contentC, setContentC] = useState(defaultInitContentConfig(contentConfig));

  const commitChange = () => {
    onSet(contentD, JSON.stringify(contentC));
    setVisible(false);
  };

  const contentDataOnChange = ({target: {value}}) => setContentD(value);
  const contentConfigOnChange = (value) => setContentC({type: value});


  return (
    <div className={contentStyles}>
      <Button
        type='primary'
        shape='round'
        size='small'
        onClick={() => setVisible(true)}
      >
        点此配置文件信息
      </Button>
      <Modal
        title='请在下方填写配置信息'
        visible={visible}
        onOk={commitChange}
        onCancel={() => setVisible(false)}
      >
        <Space style={{marginBottom: 5}}>
          <span>选择行业：</span>
          <Select
            onChange={contentConfigOnChange}
            size='small'
            style={{ width: 120 }}
          >
            <Select.Option value="bank">银行</Select.Option>
          </Select>
        </Space>
        <Input
          placeholder='文件名称'
          onBlur={contentDataOnChange}
          defaultValue={contentD}
        />
      </Modal>
    </div>
  );
};

const DisplayField = ({contentData, contentConfig, contentStyles}) => {

  const [data, setData] = useState('');

  useEffect(() => {
    if (contentData !== '') {
      getFolderStructure(JSON.parse(contentConfig).type, contentData)
        .then(res => setData(res))
    }
  }, [contentData])

  return <div className={contentStyles}>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>;
};


export const ListFileContent = ContentGenerator(InputField, DisplayField);

export default ListFileContent;

