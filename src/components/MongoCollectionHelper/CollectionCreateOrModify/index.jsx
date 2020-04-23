/**
 * Created by Jacob Xie on 4/15/2020.
 */

import React, { useState } from 'react';
import { Input, Radio, Space, Tooltip } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { useDidMountEffect } from '@/utilities/utils';

const CheckCollectionSuffix = ({nameValid}) => {
  if (nameValid === 1) {
    return (
      <Tooltip title='表名称可用'>
        <CheckCircleOutlined style={{color: 'green'}}/>
      </Tooltip>
    )
  }
  if (nameValid === 2) {
    return (
      <Tooltip title='表名称不可用'>
        <CloseCircleOutlined style={{color: 'red'}}/>
      </Tooltip>
    )
  }
  return <></>
}

export default ({onSetCollectionProp, onCheckExist = () => {}, hasCreateModifySelection = true}) => {
  const [collectionName, setCollectionName] = useState('')
  const [ifCreate, setIfCreate] = useState( hasCreateModifySelection ? 'create' : 'modify')
  const [collectionNameValid, setCollectionNameValid] = useState(0)

  const setCollectionProp = () => onSetCollectionProp(collectionName, ifCreate === 'create')
    .then(res => {
      if (res) {
        setCollectionNameValid(1);
        onCheckExist(true);
      }

      if (!res) {
        setCollectionNameValid(2);
        onCheckExist(false);
      }

      if (res === undefined) {
        setCollectionNameValid(0);
        onCheckExist(false);
      }

    })

  const inputOnBlur = ({target: {value}}) => setCollectionName(value);
  const radioOnChange = ({target: {value}}) => setIfCreate(value);

  useDidMountEffect(setCollectionProp, [collectionName, ifCreate])

  return (
    <Space>
      <Input
        placeholder='       英文表名称'
        onBlur={inputOnBlur}
        onPressEnter={inputOnBlur}
        suffix={<CheckCollectionSuffix nameValid={collectionNameValid}/>}
        style={{width: 150}}
      />
      {
        hasCreateModifySelection ?
          <Radio.Group
            defaultValue={ifCreate}
            onChange={radioOnChange}
            style={{marginLeft: 15}}
          >
            <Radio value='create'>新建</Radio>
            <Radio value='modify'>修改</Radio>
          </Radio.Group> :
          <></>
      }
    </Space>
  )
}

