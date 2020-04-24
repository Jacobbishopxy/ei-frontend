/**
 * Created by Jacob Xie on 4/13/2020.
 */

import React, { useEffect, useState } from 'react';
import {
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
import FieldOperationButtons from './FieldOperationButtons';
import CollectionCreateOrModifySubmit from './CollectionCreateOrModifySubmit';


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
};

const generateCollectionDataReversed = collectionFields =>
  collectionFields.map(field => {
    const {fieldName, fieldType, nameAlias, indexOption, description} = field;
    let io;
    if (indexOption) {
      io = (field.indexOption.ascending === true) ? 'asc' : 'dsc';
    } else {
      io = undefined;
    }

    return {
      fieldName,
      fieldType,
      nameAlias,
      indexOption: io,
      description
    };
  });


export default ({initFields, onCheckCollection, onSubmit}) => {

  const [fieldModalVisible, setFieldModalVisible] = useState(false);
  const [collectionProp, setCollectionProp] = useState({name: '', ifCreate: true});
  const [disableAction, setDisableAction] = useState(true);

  const [fieldList, setFieldList] = useState([]);

  const [initFieldValue, setInitFieldValue] = useState({});
  const [modifyFieldIndex, setModifyFieldIndex] = useState(-1);

  const [finalDisplayView, setFinalDisplayView] = useState({});

  useEffect(
    () => setFieldList(generateCollectionDataReversed(initFields)),
    [initFields]
  );

  const resetCollectionProp = () => {
    setCollectionProp({name: '', ifCreate: true})
    setFinalDisplayView({})
  }

  const resetStates = () => {
    setInitFieldValue({});
    setModifyFieldIndex(-1);
  }
  const modalClose = () => {
    setFieldModalVisible(false);
    resetStates();
  }
  const modalOpen = () => {
    setFieldModalVisible(true);
  }

  const onCheckExist = b => {
    if (b) setDisableAction(false);
    if (!b) setDisableAction(true);
  }

  const onSetCollectionProp = (name, ifCreate) => {
    setCollectionProp({name, ifCreate});
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

  const onBeforeSubmitCreateOrModifyCollection = () => {
    const collectionData = generateCollectionData(collectionProp.name, fieldList)
    setFinalDisplayView(collectionData)
  }

  const onSubmitCreateOrModifyCollection = () => {
    const {name, ifCreate} = collectionProp
    onSubmit(finalDisplayView, ifCreate)
      .then(res => {
        if (ifCreate) message.success(`${name} 创建成功！ ${res}`);
        if (!ifCreate) message.success(`${name} 修改成功！ ${res}`);
        resetCollectionProp();
      })
      .catch(res => {
        if (ifCreate) message.error(`${name} 创建失败！ ${res}`);
        if (!ifCreate) message.error(`${name} 修改失败！ ${res}`);
      })
  }

  return (
    <div>
      <Row className={styles.stepRow}>
        <Col offset={2}>
          <Space>
            <img src={png1} className={styles.orderImage} alt='1'/>
            <CollectionCreateOrModify
              onSetCollectionProp={onSetCollectionProp}
              onCheckExist={onCheckExist}
            />
          </Space>
        </Col>
      </Row>

      <Row className={styles.stepRow}>
        <Col offset={2}>
          <Space>
            <img src={png2} className={styles.orderImage} alt='2'/>
            <FieldOperationButtons
              disableClick={disableAction}
              onClickNewField={modalOpen}
              onClickPreDefined={onCreateField}
            />
          </Space>
        </Col>
      </Row>

      <Row className={styles.stepRow}>
        <Col offset={2} span={18}>
          <FieldListDisplay
            ifCreate={collectionProp.ifCreate}
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
            <CollectionCreateOrModifySubmit
              disableClick={disableAction}
              presentView={finalDisplayView}
              ifCreate={collectionProp.ifCreate}
              onPreSubmit={onBeforeSubmitCreateOrModifyCollection}
              onSubmit={onSubmitCreateOrModifyCollection}
            />
          </Space>
        </Col>
      </Row>

      <FieldCreateModal
        initialValues={initFieldValue}
        visible={fieldModalVisible}
        onCreate={onCreateField}
        onCancel={modalClose}
      />
    </div>
  );
};

