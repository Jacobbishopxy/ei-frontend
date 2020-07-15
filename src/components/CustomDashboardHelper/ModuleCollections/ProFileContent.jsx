/**
 * Created by Jacob Xie on 7/15/2020.
 */

import React, { useRef, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { FileManager, FileNavigator } from '@opuscapita/react-filemanager';
import connectorNodeV1 from '@opuscapita/react-filemanager-connector-node-v1';

import ContentGenerator from '@/components/CustomDashboardHelper/ModuleCollections/ContentGenerator';
import { linkToExternalWebsite } from './linkToExternalWebsite';

const checkContentConfig = cc => {
  if (cc === undefined) return {name: '', detail: ''}
  return JSON.parse(cc)
};


const InputField = ({onSet, contentData, contentConfig, contentStyles}) => {
  const [visible, setVisible] = useState(false);
  const [contentD, setContentD] = useState(contentData);
  const [contentC, setContentC] = useState(checkContentConfig(contentConfig));

  const commitChange = () => {
    onSet(contentD, JSON.stringify(contentC));
    setVisible(false);
  };

  const contentDataOnChange = ({target: {value}}) => setContentD(value);
  const contentConfigOnChange1 = ({target: {value}}) => setContentC({...contentC, name: value});
  const contentConfigOnChange2 = ({target: {value}}) => setContentC({...contentC, detail: value});

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
          onBlur={contentConfigOnChange1}
          defaultValue={contentC.name}
        />
        <Input
          placeholder='明细接口'
          onBlur={contentConfigOnChange2}
          defaultValue={contentC.detail}
        />
      </Modal>
    </div>
  );
};


const DisplayField = ({contentData, contentConfig}) => {

  const linkRef = useRef(null);

  const onButtonClick = () => linkRef.current.click();

  const {name, detail} = checkContentConfig(contentConfig);

  const apiOptions = {
    ...connectorNodeV1.apiOptions,
    apiRoot: `${contentData}/${name}`
  }

  const capabilities = (apiOptions_, actions) => ([
    ...(connectorNodeV1.capabilities(apiOptions_, actions)),
    ({
      id: 'custom-button',
      icon: {
        svg: linkToExternalWebsite
      },
      label: 'link',
      shouldBeAvailable: () => true,
      availableInContexts: ['toolbar'],
      handler: onButtonClick
    })
  ])


  return (
    <div style={{height: '100%'}}>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href={detail}
        ref={linkRef}
      />
      <FileManager>
        <FileNavigator
          id="filemanager-1"
          api={connectorNodeV1.api}
          apiOptions={apiOptions}
          capabilities={capabilities}
          listViewLayout={connectorNodeV1.listViewLayout}
          viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
        />
      </FileManager>
    </div>
  );
};

export const ProFileContent = ContentGenerator(InputField, DisplayField);

export default ProFileContent;
