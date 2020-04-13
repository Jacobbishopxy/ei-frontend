import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Dropdown,
  Space,
  Modal,
  Form,
  Input,
  Radio,
  Select,
  Row,
  Col,
  Card,
  Menu,
  message
} from 'antd';
import { DownOutlined, StarOutlined } from '@ant-design/icons';
import _ from 'lodash';

import styles from './index.less';


const FieldCreateForm = ({visible, onCreate, onCancel}) => {
  const [form] = Form.useForm();

  const onOk = () => form
    .validateFields()
    .then(values => {
      form.resetFields();
      onCreate(values);
    })
    .catch(err => {
      console.log('Validate failed: ', err)
    })

  return (
    <Modal
      visible={visible}
      title="创建列明细"
      okText="确认"
      cancelText="取消"
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form
        form={form}
        layout='vertical'
        name='modalForm'
        initialValues={{
          'index': 'non'
        }}
      >
        <Form.Item
          name='fieldName'
          label='英文字段'
          rules={[{required: true}]}
          extra='不可与其它列重复'
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="nameAlias"
          label="中文别名"
          rules={[{required: true}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="fieldType"
          label="数据类型"
          rules={[{required: true}]}
        >
          <Select>
            <Select.Option value={2}>字符</Select.Option>
            <Select.Option value={9}>日期</Select.Option>
            <Select.Option value={1}>小数</Select.Option>
            <Select.Option value={16}>整数</Select.Option>
            <Select.Option value={8}>布尔</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="indexOption"
          label="关键字段"
          extra="确保数据唯一性"
        >
          <Radio.Group defaultValue="non" buttonStyle="solid" style={{width: '100%'}}>
            <Radio.Button style={{width: '34%'}} value="non">非关键</Radio.Button>
            <Radio.Button style={{width: '33%'}} value="asc">升序</Radio.Button>
            <Radio.Button style={{width: '33%'}} value="dsc">降序</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="description"
          label="字段描述"
        >
          <Input/>
        </Form.Item>
      </Form>

    </Modal>
  )
};


const FieldDisplay = ({field, index, onRemove}) => {
  const title = `字段序号 ${index + 1}`
  const extra = <Button onClick={onRemove} size='small' type='link' danger ghost>删除</Button>
  const style = field.indexOption ? {backgroundColor: 'rgba(114, 46, 209, 0.2)'} : {}

  return (
    <Card
      title={title}
      style={{width: 200, height: 180, ...style}}
      size='small'
      extra={extra}
    >
      <div>英文字段: {field.fieldName}</div>
      <div>中文别名: {field.nameAlias}</div>
      <div>数据类型: {field.fieldType}</div>
      <div>关键字段: {field.indexOption}</div>
      <div>字段描述: {field.description}</div>
    </Card>
  )
};

const PreDefinedField = ({onClick}) => {
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key='date' style={{color: 'rgba(114, 46, 209, 1)'}}>
        <StarOutlined/> 日期
      </Menu.Item>
      <Menu.Item key='symbol' style={{color: 'rgba(114, 46, 209, 1)'}}>
        <StarOutlined/> 代码
      </Menu.Item>
      <Menu.Item key='region' style={{color: 'rgba(114, 46, 209, 1)'}}>
        <StarOutlined/> 地区
      </Menu.Item>
      <Menu.Item key='price'>
        价格
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button>添加预定义字段 <DownOutlined/></Button>
    </Dropdown>
  )
};


const preDefinedFieldMap = key => {
  switch (key) {
    case 'date':
      return {fieldName: 'date', nameAlias: '日期', fieldType: 9, indexOption: 'asc', description: 'e.g. 20190101'};
    case 'symbol':
      return {fieldName: 'symbol', nameAlias: '代码', fieldType: 2, indexOption: 'dsc', description: 'e.g. 000001.SZ'};
    case 'region':
      return {fieldName: 'region', nameAlias: '地区', fieldType: 2, indexOption: 'dsc', description: '地区'};
    case 'price':
      return {fieldName: 'price', nameAlias: '价格', fieldType: 1, description: '带小数点'};
    default:
      return {};
  }
};


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

const FiledListSkeleton = ({fieldList, onRemoveField}) => {
  if (fieldList.length) {
    return fieldList.map((field, index) => (
      <Col span={4}>
        <FieldDisplay
          field={field}
          index={index}
          onRemove={() => onRemoveField(index)}
          key={field.name}
        />
      </Col>
    ))
  }
  return <div style={{height: 180}}/>
}


export default () => {

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

  const onPreDefinedCreate = value =>
    onCreate(preDefinedFieldMap(value.key))

  const onRemoveField = idx =>
    setFieldList(fieldList.filter((item, index) => index !== idx))

  const onSubmitCreateNewCollection = () => {
    const r = generateCreateCollectionData(collectionName, fieldList)
    console.log(r)
  }

  return (
    <PageHeaderWrapper>
      <Row style={{marginBottom: 10}}>
        <Col offset={6}>
          <Space>
            新建表名称：
            <Input placeholder='英文名称' onBlur={onSetCollectionName}/>
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
            <PreDefinedField
              onClick={onPreDefinedCreate}
            />
          </Space>
        </Col>
      </Row>

      <Row style={{marginBottom: 10}}>
        <Col offset={2} span={18}>
          <Row>
            <FiledListSkeleton
              fieldList={fieldList}
              onRemoveField={onRemoveField}
            />
          </Row>
        </Col>
      </Row>

      <Row>
        <Col offset={6}>
          <Button type='primary' onClick={onSubmitCreateNewCollection}>提交</Button>
        </Col>
      </Row>

      <FieldCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={modalClose}
      />
    </PageHeaderWrapper>
  );
};