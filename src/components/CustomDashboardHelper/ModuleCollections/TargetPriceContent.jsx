/**
 * Created by Jacob Xie on 7/18/2020.
 */

import React, {useState} from 'react';

import ContentGenerator from '@/components/CustomDashboardHelper/ModuleCollections/ContentGenerator';
import {Button, Col, Input, InputNumber, Modal, Radio, Row, Space} from "antd";


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
    <div className={contentStyles}>

      <Input
        placeholder='股票代码'
        onBlur={contentDataOnChange}
        defaultValue={contentD}
      />
      <Radio.Group
        onChange={contentConfigOnChange1}
        defaultValue={+contentC.direction}
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

      <Button
        type='primary'
        size='small'
        onClick={commitChange}
      >
        保存
      </Button>
    </div>
  )
};


const showDirection = (dir, pr) => {
  switch (dir) {
    case "B":
      return (
        <Row>
          <Col span={6} offset={2}>
            <span style={{background: 'red', color: 'white', fontSize: 150}}>买入</span>
          </Col>
          <Col span={6} offset={10}>
            <span style={{color: 'red', fontSize: 150}}>{pr}</span>
          </Col>
        </Row>
      );
    case "S":
      return (
        <Row>
          <Col span={6} offset={2}>
            <span style={{background: 'green', color: 'white', fontSize: 150}}>卖出</span>
          </Col>
          <Col span={6} offset={10}>
            <span style={{color: 'green', fontSize: 150}}>{pr}</span>
          </Col>
        </Row>
      );
    default:
      return (
        (
          <Row>
            <Col span={6} offset={2}>
              <span style={{background: 'gray', color: 'white', fontSize: 150}}>中性</span>
            </Col>
            <Col span={6} offset={8}>
              <span style={{color: 'gray', fontSize: 150}}>{pr}</span>
            </Col>
          </Row>
        )
      );
  }
};

const DisplayField = ({contentData, contentConfig, contentStyles}) => {

  const {direction, price} = checkContentConfig(contentConfig);

  return (
    <div className={contentStyles}>
      <Row>
        <Col offset={2}>
          <span>{contentData}</span>
        </Col>
      </Row>
      {showDirection(direction, price)}
    </div>
  );
};

export const TargetPriceContent = ContentGenerator(InputField, DisplayField);

export default TargetPriceContent;

