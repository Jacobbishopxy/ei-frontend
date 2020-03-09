/**
 * Created by Jacob Xie on 3/9/2020.
 */

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input, Table, message } from 'antd';
import Papa from 'papaparse';
import _ from "lodash";

import styles from './index.less';

const antdTableColumnsGenerator = titles =>
  titles.map((item, index) => ({title: item, dataIndex: item, key: index}));

const papaConfig = {
  skipEmptyLines: true,
  header: true
};

const convertData = (titles, rawData) => {
  const cd = Papa.parse(rawData, papaConfig).data;
  if (cd.length === 0) {
    message.error('转换失败');
    return [];
  }

  const cdCheck = cd.filter(i => _.intersection(i, titles).length !== 0);
  if (cdCheck.length === 0) {
    message.error('转换失败');
    return [];
  }

  message.success('转换成功');
  return cd.map((item, index) => ({...item, key: index}))
};


const titles = ['时间', '全国', '华北', '东北', '华东', '中南', '西南', '西北'];

const columns = antdTableColumnsGenerator(titles);

export default () => {
  const [rawData, setRawData] = useState('');
  const [convertedData, setConvertedData] = useState([]);

  const readFromTextArea = ({target: {value}}) => setRawData(value);
  const cvtData = () => setConvertedData(convertData(titles, rawData));

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
