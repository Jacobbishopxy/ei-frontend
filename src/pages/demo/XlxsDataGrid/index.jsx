/**
 * Created by Jacob Xie on 3/9/2020.
 */

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { Button, Col, Input, message, Row, Table } from 'antd';
import Papa from 'papaparse';
import _ from 'lodash';
import { GraphQLClient } from 'graphql-request';

import {
  antdTableColumnsGenerator,
  getHeadConfigsMappingNameKey,
  getHeadConfigsTitle,
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

const cementPriceNew = `
mutation cementPrice($data: [IndustryCementTypeInput1]) {
  newIndustryCementPrice(data: $data)
}
`;

const newCementPrice = async data => {
  const d = data
    .map(item => (_.reduce(item, (o, v, k) => {
      if (k === 'date') {
        o[k] = v
      } else if (k !== 'key') {
        o[k] = +v
      }
      return o;
    }, {})));
  const result = await client.request(cementPriceNew, {data: d});
  const {newIndustryCementPrice} = result;
  return newIndustryCementPrice;
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


const generateTableColRenderFn = actionFn => (text, record) => (
  <span>
    <Button
      onClick={() => actionFn(record)}
      type='primary'
      size='small'
    >
      删除
    </Button>
  </span>
);


export default () => {
  const [rawStringData, setRawStringData] = useState('');
  const [convertedData, setConvertedData] = useState([]);
  const [dbData, setDbData] = useState([]);
  const [dbDataRefresh, setDbDataRefresh] = useState(0);

  useEffect(() => {
      getCementPrice('20200101', '20200301').then(res => {
        setDbData(convertDbData(res))
      }).catch()
    }, [dbDataRefresh]
  );

  const readFromTextArea = ({target: {value}}) => setRawStringData(value);
  const cvtData = () => setConvertedData(convertRawStringData(cementPrice, rawStringData));

  const removeCacheTableRow = record =>
    setConvertedData(convertedData.filter(v => v.key !== record.key));
  const removeDbTableRow = record => {
    const re = new RegExp('-', 'g');
    const d = record.date.replace(re, '');
    deleteCementPrice(d, d).then(() => setDbDataRefresh(dbDataRefresh + 1))
  };

  const uploadNewData = () => {
    if (convertedData.length !== 0) {
      newCementPrice(convertedData)
        .then(() => {
          setDbDataRefresh(dbDataRefresh + 1);
          setConvertedData([]);
        });
    }
  };

  const cacheTableColumns = antdTableColumnsGenerator(cementPrice, generateTableColRenderFn(removeCacheTableRow));
  const dbTableColumns = antdTableColumnsGenerator(cementPrice, generateTableColRenderFn(removeDbTableRow));

  return (
    <PageHeaderWrapper>
      <Row>
        <Col offset={6} span={12}>
          <Input.TextArea
            rows={4}
            allowClear
            onBlur={readFromTextArea}
            placeholder='请将符合格式的Excel数据粘着在此'
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
            onClick={uploadNewData}
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
