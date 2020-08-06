/**
 * Created by Jacob Xie on 7/31/2020.
 */


import React, {useRef, useState} from 'react';
import { Button, Input, message, Modal, Space, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Emoji } from '@/components/Emoji';
import { selectModuleToAdd } from './moduleList';
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

const checkPanelTitle = (title: string) => {
  if (title === '') return '请输入标题';
  return title;
};


export const ModulePanel = (props: ModulePanelProps) => {

  const contentRef = useRef<React.Ref<any> | null>(null);

  const selectModule = selectModuleToAdd(props.category)

  return ()
}
