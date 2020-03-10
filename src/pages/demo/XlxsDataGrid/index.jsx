/**
 * Created by Jacob Xie on 3/9/2020.
 */

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input, Table, message } from 'antd';
import Papa from 'papaparse';
import _ from 'lodash';

import {
  antdTableColumnsGenerator,
  getHeadConfigsTitle,
  getHeadConfigsMappingNameKey,
  rawDataKeysConvert
} from '@/pages/bizData/modelConfigFn';
import { cementPrice } from '@/pages/bizData/modelConfig';


const papaConfig = {
  skipEmptyLines: true,
  header: true
};

const nameKeyMapping = getHeadConfigsMappingNameKey(cementPrice);

const convertData = (headConfig, rawData) => {
  const cd = Papa.parse(rawData, papaConfig).data;
  if (cd.length === 0) {
    message.error('转换失败');
    return [];
  }

  const titles = getHeadConfigsTitle(headConfig);
  const cdCheck = cd.filter(i => _.intersection(_.keys(i), titles).length !== 0);
  if (cdCheck.length === 0) {
    message.error('转换失败');
    return [];
  }

  message.success('转换成功');
  return rawDataKeysConvert(cd, nameKeyMapping);
};


const columns = antdTableColumnsGenerator(cementPrice);


export default () => {
  const [rawData, setRawData] = useState('');
  const [convertedData, setConvertedData] = useState([]);

  const readFromTextArea = ({target: {value}}) => setRawData(value);
  const cvtData = () => setConvertedData(convertData(cementPrice, rawData));

  return (
    <PageHeaderWrapper>
      <Row>
        <Col offset={6} span={12}>
          <Input.TextArea
            rows={4}
            allowClear
            onBlur={readFromTextArea}
          />
          <br/>

          <Button
            onClick={cvtData}
          >
            转换数据
          </Button>

          <Table
            columns={columns}
            dataSource={convertedData}
            size='small'
          />
        </Col>
      </Row>
    </PageHeaderWrapper>
  )
};
