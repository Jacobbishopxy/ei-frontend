/**
 * Created by Jacob Xie on 4/9/2020.
 */

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Form, Input, Modal, Button, Select, Radio, Card, Typography } from 'antd';
import { SmileOutlined, InfoCircleOutlined } from '@ant-design/icons';
import styles from './index.less';


const layout = {
  labelCol: {offset: 2, span: 4},
  wrapperCol: {span: 16}
};

const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 20
  }
};

const useResetFormOnCloseModal = ({form, visible}) => {
  const prevVisibleRef = useRef();

  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible])

  const prevVisible = prevVisibleRef.current;

  useEffect(() => {
    if (!visible && prevVisible) form.resetFields();
  }, [visible])
};


const formItemLabel = (infoMsg, alertMsg) =>
  <div>
    <span style={{marginRight: 10}}>{infoMsg}</span>
    <InfoCircleOutlined style={{marginRight: 5, color: '#c41d7f'}}/>
    <span style={{color: '#c41d7f'}}>{alertMsg}</span>
  </div>


const ModalForm = ({visible, onCancel}) => {

  const [form] = Form.useForm();
  useResetFormOnCloseModal({form, visible})

  const onOk = () => form.submit();

  return (
    <Modal
      title="列明细"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      maskClosable={false}
      width={450}
    >
      <Form
        form={form}
        layout="vertical"
        name="fieldForm"
      >
        <Form.Item
          name="name"
          label={formItemLabel('英文名称', '不可与其它列重复')}
          rules={[{required: true}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="alias"
          label={formItemLabel('中文别名', '不可与其它列重复')}
          rules={[{required: true}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="type"
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
          name="index"
          label={formItemLabel('关键字段', '确保数据唯一性')}
        >
          <Radio.Group defaultValue="non" buttonStyle="solid" style={{width: '100%'}}>
            <Radio.Button style={{width: '34%'}} value="non">无</Radio.Button>
            <Radio.Button style={{width: '33%'}} value="asc">升序</Radio.Button>
            <Radio.Button style={{width: '33%'}} value="dsc">降序</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="description"
          label="描述"
        >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  );
}

const createdFieldDetail = (field, index, onRemove) => {
  const title = `列 ${index + 1}`
  const extra = <Button onClick={onRemove} size='small' type='danger'>删除</Button>
  return (
    <Card
      title={title}
      style={{width: 300}}
      size='small'
      extra={extra}
    >
      <div>英文字段: {field.name}</div>
      <div>中文别名: {field.alias}</div>
      <div>数据类型: {field.type}</div>
      <div>联合索引: {field.index}</div>
      <div>字段描述: {field.description}</div>
    </Card>
  )
}

// todo: edit/delete operation for existing fieldDetail

// todo: auto filled for commonly used field, e.g. 'date', 'symbol', 'region', 'price'...

export default () => {

  const [visible, setVisible] = useState(false);

  const showUserModal = () => setVisible(true);
  const hideUserModal = () => setVisible(false);
  const onFinish = values => {
    console.log('Finish: ', values)
  };

  return (
    <PageHeaderWrapper>
      <Row>
        <Col offset={8} span={8}>
          <Form.Provider
            onFormFinish={(name, {values, forms}) => {
              if (name === 'fieldForm') {
                const {basicForm} = forms;
                const mongoCollection = basicForm.getFieldValue('mongoCollection') || [];
                basicForm.setFieldsValue({
                  mongoCollection: [...mongoCollection, values],
                })
                setVisible(false);
              }
            }}
          >
            <Form {...layout} name="basicForm" onFinish={onFinish}>
              <Form.Item
                name="group"
                label="表名称"
                rules={[{required: true}]}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                label="列明细"
                shouldUpdate={(prevValues, curValues) => prevValues.mongoCollection !== curValues.mongoCollection}
              >
                {({getFieldValue}) => {
                  const mongoCollection = getFieldValue('mongoCollection') || [];

                  return mongoCollection.length ? (
                    <ul>
                      {mongoCollection.map((field, index) => (
                        <li key={field.name} className="mongoCollection">
                          {createdFieldDetail(field, index)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Typography.Text className="ant-form-text" type="secondary">
                      <SmileOutlined/> 请点击添加列
                    </Typography.Text>
                  )
                }}
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button htmlType="submit" type="primary">提交</Button>
                <Button htmlType="submit" style={{margin: '0 8px'}} onClick={showUserModal}>添加列</Button>
              </Form.Item>
            </Form>

            <ModalForm visible={visible} onCancel={hideUserModal}/>

          </Form.Provider>
        </Col>
      </Row>
    </PageHeaderWrapper>
  );
};
