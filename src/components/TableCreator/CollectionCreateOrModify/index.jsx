
/**
 * Created by Jacob Xie on 4/15/2020.
 */

import React, { useState } from 'react';
import { Input, Radio, Space, Tooltip } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

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
  return (
    <></>
  )
}

export default ({onSetCollectionName, onCollectionCreateOrModifyOnChange}) => {
  const [collectionNameValid, setCollectionNameValid] = useState(0)

  const setCollectionName = e => {
    const collectionName = e.target.value
    const res = onSetCollectionName(collectionName)
    if (res) {
      setCollectionNameValid(1)
    } else {
      setCollectionNameValid(2)
    }
  }

  const collectionCreateOrModifyOnChange = e => {
    const createOrModify = e.target.value
    onCollectionCreateOrModifyOnChange(createOrModify)
  }

  return (
    <Space>
      <Input
        placeholder='       英文表名称'
        onBlur={setCollectionName}
        suffix={<CheckCollectionSuffix nameValid={collectionNameValid}/>}
        style={{width: 150}}
      />
      <Radio.Group
        onChange={collectionCreateOrModifyOnChange}
        defaultValue='create'
        style={{marginLeft: 15}}
      >
        <Radio value='create'>新建</Radio>
        <Radio value='modify'>修改</Radio>
      </Radio.Group>
    </Space>
  )
}
