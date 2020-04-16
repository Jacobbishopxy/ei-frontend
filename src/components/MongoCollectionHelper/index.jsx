/**
 * Created by Jacob Xie on 4/13/2020.
 */

import React, { useState } from 'react';
import {
  Button,
  Space,
  Row,
  Col,
  message
} from 'antd';
import _ from 'lodash';
import styles from './index.less';

import png1 from '../../../public/icons/1.png';
import png2 from '../../../public/icons/2.png';
import png3 from '../../../public/icons/3.png';
import CollectionCreateOrModify from './CollectionCreateOrModify';
import FieldCreateModal from './FieldCreateModal';
import FieldListDisplay from './FieldListDisplay';
import PreDefinedFieldButton from './PreDefinedFieldButton';


const generateCollectionData = (collectionName, fieldList) => {
  if (collectionName === '') {
    message.error('表名称不可为空！')
    return {};
  }

  const fields = fieldList.map(item => {
    if (item.indexOption !== undefined) {
      const asc = item.indexOption === 'asc'
      return {...item, indexOption: {ascending: asc}}
    }
    return item;
  })

  return ({
    collectionName,
    fields
  })
}

export default ({onCheckCollection, onSubmit}) => {

  const [visible, setVisible] = useState(false);
  const [collectionProp, setCollectionProp] = useState({name: '', ifCreate: true});

  const [fieldList, setFieldList] = useState([]);

  const [initFieldValue, setInitFieldValue] = useState({});
  const [modifyFieldIndex, setModifyFieldIndex] = useState(-1);

  const resetCollectionProp = () =>
    setCollectionProp({name: '', ifCreate: true})

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
  }

  const onSetCollectionProp = (name, ifCreate) => {
    setCollectionProp({name, ifCreate})
    return onCheckCollection(name, ifCreate);
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

  const onSubmitCreateOrModifyCollection = () => {
    const createCollectionData = generateCollectionData(collectionProp.name, fieldList)
    const res = onSubmit(createCollectionData, collectionProp.ifCreate);
    if (res) resetCollectionProp();
  }

  return (
    <div>
      <Row className={styles.stepRow}>
        <Col offset={2}>
          <Space>
            <img src={png1} className={styles.orderImage} alt='1'/>
            <CollectionCreateOrModify
              onSetCollectionProp={onSetCollectionProp}
            />
          </Space>
        </Col>
      </Row>

      <Row className={styles.stepRow}>
        <Col offset={2}>
          <Space>
            <img src={png2} className={styles.orderImage} alt='2'/>
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

      <Row className={styles.stepRow}>
        <Col offset={2} span={18}>
          <FieldListDisplay
            fieldList={fieldList}
            onEditField={onEditField}
            onRemoveField={onRemoveField}
          />
        </Col>
      </Row>

      <Row className={styles.stepRow}>
        <Col offset={2}>
          <Space>
            <img src={png3} className={styles.orderImage} alt='3'/>
            <Button
              type='primary'
              onClick={onSubmitCreateOrModifyCollection}
            >
              提交
            </Button>
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

