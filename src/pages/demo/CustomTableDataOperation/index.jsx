import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Upload, Button, Table, message, Space } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

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

import png1 from '../../../../public/icons/1.png';
import png2 from '../../../../public/icons/2.png';
import png3 from '../../../../public/icons/3.png';
import png4 from '../../../../public/icons/4.png';
import png5 from '../../../../public/icons/5.png';
import png6 from '../../../../public/icons/6.png';


const generateTableColRenderFn = ({modifyFn, deleteFn}) => (text, record) => (
  <Space>
    <Button
      onClick={() => modifyFn(record)}
      type='primary'
      size='small'
      disabled
    >
      修改
    </Button>
    <Button
      onClick={() => deleteFn(record)}
      type='danger'
      size='small'
    >
      删除
    </Button>
  </Space>
);


const tableDataSourceAddKey = data =>
  data.map((item, index) => ({
    key: index,
    ...item
  }));

const uploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const {status} = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


export default () => {

  const [tableColumn, setTableColumn] = useState([]);
  const [cacheData, setCacheData] = useState([]);
  const [dbData, setDbData] = useState([]);
  const [rawStringData, setRawStringData] = useState('');

  const cacheTableOperationActions = record =>
    console.log('cacheTableOperationActions: ', record)
  const realTableOperationActions = record =>
    console.log('realTableOperationActions: ', record)


  const genCacheTableColumn = () => {
    const modifyFn = () => {
    };
    const deleteFn = cacheTableOperationActions;
    return antdTableColumnsAppendOperation(tableColumn, generateTableColRenderFn({modifyFn, deleteFn}));
  }
  const genRealTableColumn = () => {
    const modifyFn = () => {
    };
    const deleteFn = realTableOperationActions;
    return antdTableColumnsAppendOperation(tableColumn, generateTableColRenderFn({modifyFn, deleteFn}));
  }


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
            <img src={png1} className={styles.orderImage} alt='1'/>
            <CollectionCreateOrModify
              onSetCollectionProp={setCollectionProp}
              hasCreateModifySelection={false}
            />
          </Col>
        </Row>

        <Row className={styles.stepRow}>
          <Col offset={2}>
            <img src={png2} className={styles.orderImage} alt='2'/>
          </Col>

          <Col span={10}>
            <Input.TextArea
              rows={9}
              allowClear
              onBlur={readFromTextArea}
              onPressEnter={readFromTextArea}
              placeholder='请将符合格式的Excel数据粘着在此'
            />
          </Col>
          <Col span={10}>
            <Upload.Dragger {...uploadProps} disabled>
              <p className="ant-upload-drag-icon">
                <InboxOutlined/>
              </p>
              <p className="ant-upload-text">点击或拖拽至此进行上传</p>
              <p className="ant-upload-hint">支持上传单文件或多文件</p>
            </Upload.Dragger>
          </Col>
        </Row>

        <Row className={styles.stepRow}>
          <Col offset={2}>
            <img src={png3} className={styles.orderImage} alt='3'/>
            <Button
              onClick={cvtRawData}
            >
              转换数据
            </Button>
          </Col>
        </Row>

        <Row className={styles.stepRow}>
          <Col offset={2}>
            <img src={png4} className={styles.orderImage} alt='4'/>
          </Col>
          <Col span={20}>
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
            <img src={png5} className={styles.orderImage} alt='5'/>
            <Button
              type='primary'
              onClick={onSubmitUpload}
            >
              确认上传
            </Button>
          </Col>
        </Row>

        <Row className={styles.stepRow}>
          <Col offset={2}>
            <img src={png6} className={styles.orderImage} alt='6'/>
          </Col>
          <Col span={20}>
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
