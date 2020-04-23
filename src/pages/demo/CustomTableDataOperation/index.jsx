import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Button, Table } from 'antd';

import CollectionCreateOrModify from '@/components/MongoCollectionHelper/CollectionCreateOrModify';
import {
  doesCollectionExist,
  showCollection,
  queryData
} from '@/services/eiAdmin';
import {
  antdTableColumnsGenerator,
  antdTableColumnsAppendOperation,
  convertRawStringData
} from './modelConfigFn';

import styles from './index.less';

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


const tableDataSourceAddKey = data =>
  data.map((item, index) => ({
    key: index,
    ...item
  }));


export default () => {

  const [tableColumn, setTableColumn] = useState([]);
  const [cacheData, setCacheData] = useState([]);
  const [dbData, setDbData] = useState([]);
  const [rawStringData, setRawStringData] = useState('');

  const cacheTableOperationActions = record =>
    console.log('cacheTableOperationActions: ', record)
  const realTableOperationActions = record =>
    console.log('realTableOperationActions: ', record)


  const genCacheTableColumn = () =>
    antdTableColumnsAppendOperation(tableColumn, generateTableColRenderFn(cacheTableOperationActions));
  const genRealTableColumn = () =>
    antdTableColumnsAppendOperation(tableColumn, generateTableColRenderFn(realTableOperationActions));


  const setCollectionProp = async collectionName => {
    const dce = await doesCollectionExist(collectionName);
    if (dce) {
      const collectionInfo = await showCollection(collectionName);
      const tc = antdTableColumnsGenerator(collectionInfo.fields);
      setTableColumn(tc);

      const rawData = await queryData(collectionName, {});
      setDbData(rawData);

    } else {
      setTableColumn([]);
      setDbData([]);
    }

    return dce;
  };

  const readFromTextArea = ({target: {value}}) => setRawStringData(value);

  const cvtRawData = () => {
    const cd = convertRawStringData(tableColumn, rawStringData);
    setCacheData(cd)
  }

  const onSubmitUpload = () => console.log(cacheData);

  return (
    <PageHeaderWrapper>
      <div>
        <Row className={styles.stepRow}>
          <Col offset={2}>
            Input db name here, if exists: call `showCollection`, then update tableColumn
            <br/>
            <CollectionCreateOrModify
              onSetCollectionProp={setCollectionProp}
              hasCreateModifySelection={false}
            />
          </Col>
        </Row>

        <Row className={styles.stepRow}>
          <Col offset={2} span={20}>
            Input.TextArea & Upload here, deserialize
            <br/>
            <Input.TextArea
              rows={4}
              allowClear
              onBlur={readFromTextArea}
              onPressEnter={readFromTextArea}
              placeholder='请将符合格式的Excel数据粘着在此'
            />
          </Col>
        </Row>

        <Row className={styles.stepRow}>
          <Col offset={2}>
            Button here, data convert
            <br/>
            <Button
              onClick={cvtRawData}
            >
              转换数据
            </Button>
          </Col>
        </Row>

        <Row className={styles.stepRow}>
          <Col offset={2} span={20}>
            Table here, converted data
            <br/>
            <Table
              columns={genCacheTableColumn()}
              dataSource={tableDataSourceAddKey(cacheData)}
              size='small'
              pagination={false}
            />
          </Col>
        </Row>

        <Row className={styles.stepRow}>
          <Col offset={2}>
            Button here, data upload to db
            <br/>
            <Button
              type='primary'
              onClick={onSubmitUpload}
            >
              确认上传
            </Button>
          </Col>
        </Row>

        <Row className={styles.stepRow}>
          <Col offset={2} span={20}>
            Table here, real data represents
            <br/>
            <Table
              columns={genRealTableColumn()}
              dataSource={tableDataSourceAddKey(dbData)}
              size='small'
              pagination={false}
            />
          </Col>
        </Row>
      </div>
    </PageHeaderWrapper>
  );
};
