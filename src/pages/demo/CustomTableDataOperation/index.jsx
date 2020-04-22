import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Button, Table } from 'antd';

import CollectionCreateOrModify from '@/components/MongoCollectionHelper/CollectionCreateOrModify';
import {
  doesCollectionExist,
  showCollection,
  queryData
} from '@/services/eiAdmin';
import { antdTableColumnsGenerator } from './modelConfigFn';

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


const generateTableColumnFromCollectionInfo = (collectionInfo, operationActions) => {
  const {fields} = collectionInfo;

  return antdTableColumnsGenerator(fields, generateTableColRenderFn(operationActions))
};

const generateTableDataSourceFromQueryData = data => {
  console.log('queryData: ', data)
  return data.map((item, index) => ({
    key: index,
    ...item
  }));
};


export default () => {

  const [tableColumn, setTableColumn] = useState([]);
  const [dbData, setDbData] = useState([]);

  const operationActions = record =>
    console.log('operationActions: ', record)

  const setCollectionProp = async collectionName => {
    const dce = await doesCollectionExist(collectionName);
    if (dce) {
      const collectionInfo = await showCollection(collectionName);
      const tc = generateTableColumnFromCollectionInfo(collectionInfo, operationActions);
      setTableColumn(tc);

      const rawData = await queryData(collectionName, {});
      const ds = generateTableDataSourceFromQueryData(rawData);
      setDbData(ds);

    } else {
      setTableColumn([]);
      setDbData([]);
    }

    return dce;
  }

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
              placeholder='请将符合格式的Excel数据粘着在此'
            />
          </Col>
        </Row>

        <Row className={styles.stepRow}>
          <Col offset={2}>
            Button here, data convert
            <br/>
            <Button>
              转换数据
            </Button>
          </Col>
        </Row>

        <Row className={styles.stepRow}>
          <Col offset={2} span={20}>
            Table here, converted data
            <br/>
            <Table
              columns={tableColumn}
              dataSource={[]}
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
              columns={tableColumn}
              dataSource={dbData}
              size='small'
              pagination={false}
            />
          </Col>
        </Row>
      </div>
    </PageHeaderWrapper>
  );
};
