/**
 * Created by Jacob Xie on 7/18/2020.
 */

import React, {useState} from 'react';
import {Button, Col, Input, InputNumber, Radio, Row, Space} from "antd";

import ContentGenerator from '@/components/CustomDashboardHelper/ModuleCollections/ContentGenerator';
import styles from './Common.less';


const checkContentConfig = cc => {
  if (cc === undefined) return {direction: null, price: null}
  return JSON.parse(cc)
};

const InputField = ({onSet, contentData, contentConfig, contentStyles}) => {
  const [contentD, setContentD] = useState(contentData);
  const [contentC, setContentC] = useState(checkContentConfig(contentConfig));

  const commitChange = () => onSet(contentD, JSON.stringify(contentC));

  const contentDataOnChange = ({target: {value}}) => setContentD(value);
  const contentConfigOnChange1 = ({target: {value}}) => setContentC({...contentC, direction: value});
  const contentConfigOnChange2 = (value) => setContentC({...contentC, price: value});

  return (
    <div className={contentStyles} style={{top: '20%'}}>
      <Space align='center' direction='vertical'>
        <Radio.Group
          onChange={contentConfigOnChange1}
          defaultValue={contentC.direction}
        >
          <Radio value="B"><span style={{color: 'red'}}>买入</span></Radio>
          <Radio value="M"><span style={{color: 'gray'}}>中性</span></Radio>
          <Radio value="S"><span style={{color: 'green'}}>卖出</span></Radio>
        </Radio.Group>
        <InputNumber
          min={0}
          step={0.01}
          onChange={contentConfigOnChange2}
          defaultValue={contentC.price}
        />
        <Input
          placeholder='备注'
          onBlur={contentDataOnChange}
          defaultValue={contentD}
          style={{width: 200}}
        />
        <Button
          type='primary'
          size='small'
          onClick={commitChange}
        >
          保存
        </Button>
      </Space>
    </div>
  )
};


const showDirection = (dir, pr) => {
  switch (dir) {
    case "B":
      return (
        <Row className={styles.targetPriceTagB}>
          <Col span={6} offset={4}>
            <span className={styles.dir}>买入</span>
          </Col>
          <Col span={6} offset={6}>
            <span className={styles.pr}>{pr}</span>
          </Col>
        </Row>
      );
    case "S":
      return (
        <Row className={styles.targetPriceTagS}>
          <Col span={6} offset={4}>
            <span className={styles.dir}>卖出</span>
          </Col>
          <Col span={6} offset={6}>
            <span className={styles.pr}>{pr}</span>
          </Col>
        </Row>
      );
    default:
      return (
        (
          <Row className={styles.targetPriceTagM}>
            <Col span={6} offset={4}>
              <span className={styles.dir}>中性</span>
            </Col>
            <Col span={6} offset={6}>
              <span className={styles.pr}>{pr}</span>
            </Col>
          </Row>
        )
      );
  }
};

const DisplayField = ({contentData, contentConfig}) => {

  const {direction, price} = checkContentConfig(contentConfig);

  return (
    <>
      <div style={{height: 5}}/>
      <Row>
        <Col span={6} offset={4}>
          <span className={styles.targetPriceText}>投资建议</span>
        </Col>
        <Col span={6} offset={6}>
          <span className={styles.targetPriceText}>目标价</span>
        </Col>
      </Row>

      {showDirection(direction, price)}
      <Row>
        <Col offset={2}>
          <span>{contentData}</span>
        </Col>
      </Row>
    </>
  );
};

export const TargetPriceContent = ContentGenerator(InputField, DisplayField);

export default TargetPriceContent;

