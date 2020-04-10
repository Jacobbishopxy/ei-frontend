/**
 * Created by Jacob Xie on 4/9/2020.
 */

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less';


export default () => {

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <PageHeaderWrapper>
      <Row>
        <Col offset={8} span={8}>
          <div style={{marginBottom: 20}}>Passengers:</div>
          <Form className={styles.dynamicDeleteButton} onFinish={onFinish}>
            <Form.List name="names">
              {
                (fields, {add, remove}) => (
                  <div>
                    {
                      fields.map((field) => (
                        <Form.Item
                          required={false}
                          key={field.key}
                        >
                          <Form.Item
                            {...field}
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: 'Please input passenger\'s name or delete this field.'
                              }
                            ]}
                            noStyle
                          >
                            <Input placeholder="passenger name" style={{width: '90%'}}/>
                          </Form.Item>
                          {
                            fields.length > 1 ? (
                              <MinusCircleOutlined
                                className={styles.dynamicDeleteButton}
                                style={{margin: '0 8px'}}
                                onClick={() => remove(field.name)}
                              />
                            ) : null
                          }
                        </Form.Item>
                      ))
                    }
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={add}
                        style={{width: '90%'}}
                      >
                        <PlusOutlined/> Add field
                      </Button>
                    </Form.Item>
                  </div>
                )

              }
            </Form.List>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

        </Col>
      </Row>
    </PageHeaderWrapper>
  );
};
