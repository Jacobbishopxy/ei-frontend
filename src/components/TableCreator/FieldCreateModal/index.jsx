/**
 * Created by Jacob Xie on 4/13/2020.
 */

import React from 'react';
import { Form, Input, Modal, Radio, Select } from 'antd';


export default ({visible, onCreate, onCancel}) => {
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
          'indexOption': undefined
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
          <Radio.Group buttonStyle="solid" style={{width: '100%'}}>
            <Radio.Button style={{width: '34%'}} value={undefined}>非关键</Radio.Button>
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
