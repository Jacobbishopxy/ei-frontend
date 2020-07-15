/**
 * Created by Jacob Xie on 7/15/2020.
 */

import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { FileManager, FileNavigator } from '@opuscapita/react-filemanager';
import connectorNodeV1 from '@opuscapita/react-filemanager-connector-node-v1';

import ContentGenerator from '@/components/CustomDashboardHelper/ModuleCollections/ContentGenerator';


const InputField = ({onSet, contentData, contentConfig, contentStyles}) => {
  const [visible, setVisible] = useState(false);
  const [contentD, setContentD] = useState(contentData);
  const [contentC, setContentC] = useState(contentConfig);

  const commitChange = () => {
    onSet(contentD, contentC);
    setVisible(false);
  };

  const contentDataOnChange = ({target: {value}}) => setContentD(value);
  const contentConfigOnChange = ({target: {value}}) => setContentC(value);

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
        <Input
          placeholder='接口链接'
          onBlur={contentDataOnChange}
          defaultValue={contentD}
        />
        <Input
          placeholder='文件名称'
          onBlur={contentConfigOnChange}
          defaultValue={contentC}
        />
      </Modal>
    </div>
  );
};

const DisplayField = ({contentData, contentConfig, contentStyles}) => {

  const apiOptions = {
    ...connectorNodeV1.apiOptions,
    apiRoot: `${contentData}/${contentConfig}`
  }

  return (
    <div style={{height: '100%'}}>
      <FileManager>
        <FileNavigator
          id="filemanager-1"
          api={connectorNodeV1.api}
          apiOptions={apiOptions}
          capabilities={connectorNodeV1.capabilities}
          listViewLayout={connectorNodeV1.listViewLayout}
          viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
        />
      </FileManager>
    </div>
  );
};

export const ProFileContent = ContentGenerator(InputField, DisplayField);

export default ProFileContent;
