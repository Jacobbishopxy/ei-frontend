/**
 * Created by Jacob Xie on 4/13/2020.
 */

import React, { useState } from 'react';
import {
  Button,
  Space,
  Input,
  Row,
  Col,
  Tooltip,
  message, Radio
} from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';

import png1 from '../../../public/icons/1.png'
import png2 from '../../../public/icons/2.png'
import png3 from '../../../public/icons/3.png'
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


export default ({onCheckCollection, onSubmit}) => {

  const [visible, setVisible] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [collectionNameValid, setCollectionNameValid] = useState(0)
  const [fieldList, setFieldList] = useState([]);

  const [initFieldValue, setInitFieldValue] = useState({});
  const [modifyFieldIndex, setModifyFieldIndex] = useState(-1);

  const resetStates = () => {
    setInitFieldValue({});
    setModifyFieldIndex(-1);
  }
  const modalClose = () => {
    setVisible(false);
    resetStates();
  }
  const modalOpen = () => {
    setVisible(true);
    // resetStates();
  }

  const onSetCollectionName = e => {
    // if (onCheckCollection()) {
    //   setCollectionName(e.target.value)
    //   setCollectionNameValid(1)
    // } else {
    //   setCollectionNameValid(2)
    // }

    // todo: `onCheckCollection` should have functionalities as following:
    //  1. accept string input and mode type (`create` and `modify`)
    //  2. if `create`, list all collections and check if duplicated
    //  3. if `modify`, return validator if collection exists


    setCollectionName(e.target.value)
  }

  const ifFieldNameDuplicated = (newField, index) => {
    if (_.isEmpty(newField)) {
      message.error('空字段！')
      return false;
    }
    const fieldNames = fieldList.map(i => i.fieldName);
    if (fieldNames.includes(newField.fieldName) && fieldNames.indexOf(newField.fieldName) !== index) {
      message.error('重复的英文字段！')
      return false;
    }
    return true;
  };

  const onCreateField = values => {
    console.log('onCreateField')
    if (ifFieldNameDuplicated(values, modifyFieldIndex)) {
      if (modifyFieldIndex === -1) {
        setFieldList(fieldList.concat(values));
      } else {
        setFieldList(fieldList.map((item, index) => index === modifyFieldIndex ? values : item));
      }
      modalClose();
    }
  }

  const onEditField = idx => {
    setInitFieldValue(fieldList[idx]);
    setModifyFieldIndex(idx);
    modalOpen();
  }

  const onRemoveField = idx =>
    setFieldList(fieldList.filter((item, index) => index !== idx))

  const onSubmitCreateNewCollection = () => {
    const createCollectionData = generateCreateCollectionData(collectionName, fieldList)
    const res = onSubmit(createCollectionData);
    if (res) {
      setCollectionName('')
      setCollectionNameValid(0)
    }
  }

  return (
    <div>
      <Row style={{marginBottom: 10}}>
        <Col offset={2}>
          <Space>
            <img src={png1} style={{height: 20, width: 20}} alt='1'/>
            <Input
              placeholder='       英文表名称'
              onBlur={onSetCollectionName}
              suffix={<CheckCollectionSuffix nameValid={collectionNameValid}/>}
              style={{width: 150}}
            />
            <Radio.Group defaultValue='create' style={{marginLeft: 15}}>
              <Radio value='create'>新建</Radio>
              <Radio value='modify'>修改</Radio>
            </Radio.Group>
          </Space>
        </Col>
      </Row>

      <Row style={{marginBottom: 10}}>
        <Col offset={2}>
          <Space direction='horizontal'>
            <img src={png2} style={{height: 20, width: 20}} alt='2'/>
            <Button
              type="primary"
              onClick={modalOpen}
              style={{width: 150}}
            >
              添加新字段
            </Button>
            <PreDefinedFieldButton
              onClick={onCreateField}
            />
          </Space>
        </Col>
      </Row>

      <Row style={{marginBottom: 10}}>
        <Col offset={2} span={18}>
          <FieldListDisplay
            fieldList={fieldList}
            onEditField={onEditField}
            onRemoveField={onRemoveField}
          />
        </Col>
      </Row>

      <Row>
        <Col offset={2}>
          <Space>
            <img src={png3} style={{height: 20, width: 20}} alt='3'/>
            <Button type='primary' onClick={onSubmitCreateNewCollection}>提交</Button>
          </Space>
        </Col>
      </Row>

      <FieldCreateModal
        initialValues={initFieldValue}
        visible={visible}
        onCreate={onCreateField}
        onCancel={modalClose}
      />
    </div>
  );
};
