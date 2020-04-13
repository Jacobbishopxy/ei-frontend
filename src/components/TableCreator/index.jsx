/**
 * Created by Jacob Xie on 4/13/2020.
 */

import React, { useState, useEffect } from 'react';
import {
  Button,
  Space,
  Input,
  Row,
  Col,
  message
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import _ from 'lodash';

import FieldCreateModal from './FieldCreateModal'
import FieldListDisplay from './FieldListDisplay'
import PreDefinedFieldButton from './PreDefinedFieldButton'


const generateCreateCollectionData = (collectionName, fieldList) => {
  if (collectionName === '') {
    message.error('表名称不可为空！')
    return {};
  }

  const cols = fieldList.map(item => {
    if (item.indexOption !== undefined) {
      const asc = item.indexOption === 'asc'
      return {...item, indexOption: {ascending: asc}}
    }
    return item;
  })

  return ({
    collectionName,
    cols
  })
}


export default ({onSubmit}) => {

  const [visible, setVisible] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [fieldList, setFieldList] = useState([]);

  const modalClose = () => setVisible(false);
  const modalOpen = () => setVisible(true);

  const onSetCollectionName = e =>
    setCollectionName(e.target.value)

  const ifFieldNameDuplicated = newField => {
    if (_.isEmpty(newField)) {
      message.error('空字段！')
      return false;
    }
    const fieldNames = fieldList.map(i => i.fieldName);
    if (fieldNames.includes(newField.fieldName)) {
      message.error('重复的英文字段！')
      return false;
    }
    return true;
  };

  const onCreate = values => {
    if (ifFieldNameDuplicated(values)) {
      setFieldList(fieldList.concat(values))
      modalClose();
    }
  }

  const onRemoveField = idx =>
    setFieldList(fieldList.filter((item, index) => index !== idx))

  const onSubmitCreateNewCollection = () => {
    const createCollectionData = generateCreateCollectionData(collectionName, fieldList)
    onSubmit(createCollectionData);
  }

  return (
    <div>
      <Row style={{marginBottom: 10}}>
        <Col offset={6}>
          <Space>
            新建表名称：
            <Input
              placeholder='英文名称'
              prefix={<EditOutlined/>}
              onBlur={onSetCollectionName}
            />
          </Space>
        </Col>
      </Row>

      <Row style={{marginBottom: 10}}>
        <Col offset={6} span={10}>
          <Space direction='horizontal'>
            <Button
              type="primary"
              onClick={modalOpen}
            >
              添加新字段
            </Button>
            <PreDefinedFieldButton
              onClick={onCreate}
            />
          </Space>
        </Col>
      </Row>

      <Row style={{marginBottom: 10}}>
        <Col offset={2} span={18}>
          <FieldListDisplay
            fieldList={fieldList}
            onRemoveField={onRemoveField}
            key='dfl'
          />
        </Col>
      </Row>

      <Row>
        <Col offset={6}>
          <Button type='primary' onClick={onSubmitCreateNewCollection}>提交</Button>
        </Col>
      </Row>

      <FieldCreateModal
        visible={visible}
        onCreate={onCreate}
        onCancel={modalClose}
      />
    </div>
  );
};
