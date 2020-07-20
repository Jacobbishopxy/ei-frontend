/**
 * Created by Jacob Xie on 7/10/2020.
 */

import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, Select, Space } from 'antd';
import ReactEcharts from 'echarts-for-react';

import { getProFileStructure } from '@/services/eiFile';
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

const genGraphOp = d =>  ({
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove'
  },
  series: [
    {
      type: 'tree',
      name: 'file-tree',
      data: [d],

      top: '10%',
      left: '5%',
      bottom: '10%',
      right: '50%',

      symbolSize: 7,

      edgeShape: 'polyline',
      initialTreeDepth: -1,

      lineStyle: {
        width: 2
      },

      label: {
        position: 'left',
        verticalAlign: 'middle',
        align: 'right'
      },

      leaves: {
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left'
        }
      },

      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750
    }
  ]
});


const DisplayField = ({contentData, contentConfig, contentStyles}) => {

  const [graphOp, setGraphOp] = useState({});

  useEffect(() => {
    if (contentData !== '') {
      getProFileStructure(JSON.parse(contentConfig).type, contentData)
        .then(res => setGraphOp(genGraphOp(res)))
    }
  }, [contentData])

  return <div className={contentStyles}>
    <ReactEcharts
      style={{height: '100%', width: '100%'}}
      option={graphOp}
    />
  </div>;
};


export const FileListContent = ContentGenerator(InputField, DisplayField);

export default FileListContent;

