/**
 * Created by Jacob Xie on 3/9/2020.
 */

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input, Table, message } from 'antd';
import Papa from 'papaparse';
import _ from 'lodash';
import { GraphQLClient } from 'graphql-request';

import {
  antdTableColumnsGenerator,
  getHeadConfigsTitle,
  getHeadConfigsMappingNameKey,
  rawDataKeysConvert
} from '@/pages/bizData/modelConfigFn';
import { cementPrice } from '@/pages/bizData/modelConfig';
import { numberToDateString } from '@/utilities/utils';


const gqlUrl = 'http://localhost:8880/graphql';

const client = new GraphQLClient(gqlUrl);

const cementPriceQuery = `
query cementPrice($start: String! $end: String!) {
  getIndustryCementPrice(start: $start end: $end) {
    date
    all
    hb
    db
    hd
    zn
    xn
    xb
  }
}
`;

const getCementPrice = async (start, end) => {
  const result = await client.request(cementPriceQuery, {start, end});
  const {getIndustryCementPrice} = result;
  return getIndustryCementPrice;
};

const cementPriceDelete = `
mutation cementPrice($start: String! $end: String!) {
  deleteIndustryCementPrice(start: $start end: $end)
}
`;

const deleteCementPrice = async (start, end) => {
  const result = await client.request(cementPriceDelete, {start, end});
  const {deleteIndustryCementPrice} = result;
  return deleteIndustryCementPrice;
};

const papaConfig = {
  skipEmptyLines: true,
  header: true
};

const nameKeyMapping = getHeadConfigsMappingNameKey(cementPrice);

const convertRawStringData = (headConfig, rawData) => {
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

const convertDbData = data =>
  data.map((item, index) => ({...item, date: numberToDateString(+item.date), key: index}));


const cacheTableColRenderFn = (text, record) => (
  <span>
    <Button
      type='primary'
      size='small'
    >
      删除
    </Button>
  </span>
);

const dbTableColRenderFn = (text, record) => (
  <span>
    <Button
      onClick={() => {
        const re = new RegExp('-', 'g');
        const d = record.date.replace(re, "");
        deleteCementPrice(d, d).catch()
      }}
      type='primary'
      size='small'
    >
      删除
    </Button>
  </span>
);

const cacheTableColumns = antdTableColumnsGenerator(cementPrice, cacheTableColRenderFn);
const dbTableColumns = antdTableColumnsGenerator(cementPrice, dbTableColRenderFn);


export default () => {
  const [rawStringData, setRawStringData] = useState('');
  const [convertedData, setConvertedData] = useState([]);
  const [dbData, setDbData] = useState([]);

  useEffect(() => {

    getCementPrice('20190101', '20200101').then(res => {
      setDbData(convertDbData(res))
    }).catch();

  }, [dbData]);

  const readFromTextArea = ({target: {value}}) => setRawStringData(value);
  const cvtData = () => setConvertedData(convertRawStringData(cementPrice, rawStringData));

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
            columns={cacheTableColumns}
            dataSource={convertedData}
            size='small'
            pagination={false}
          />

          <Button

          >
            确认上传
          </Button>

          <Table
            columns={dbTableColumns}
            dataSource={dbData}
            size='small'
          />
        </Col>
      </Row>
    </PageHeaderWrapper>
  )
};
