import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import {
  Row,
  Col,
  Input,
  Upload,
  Button,
  Table,
  message,
  Space,
  Modal
} from 'antd';
import { ExclamationCircleOutlined, InboxOutlined } from '@ant-design/icons';
import _ from 'lodash';

import CollectionCreateOrModify from '@/components/MongoCollectionHelper/CollectionCreateOrModify';
import {
  doesCollectionExist,
  showCollection,
  queryData,
  showPrimaryKeys,
  deleteData,
  insertData
} from '@/services/eiAdmin';
import { useDidMountEffect } from '@/utilities/utils';
import {
  antdTableColumnsGenerator,
  antdTableColumnsAppendOperation,
  convertRawStringData,
  tableDataSourceAddKey
} from './modelConfigFn';

import styles from './index.less';

import png1 from '../../../../public/icons/1.png';
import png2 from '../../../../public/icons/2.png';
import png3 from '../../../../public/icons/3.png';
import png4 from '../../../../public/icons/4.png';
import png5 from '../../../../public/icons/5.png';
import png6 from '../../../../public/icons/6.png';


const confirmDelete = (onConfirm) => Modal.confirm({
  title: '确认删除',
  icon: <ExclamationCircleOutlined/>,
  okText: '确认',
  okType: 'danger',
  cancelText: '取消',
  onOk: onConfirm
});

const confirmSubmit = (onConfirm) => Modal.confirm({
  title: '确认上传',
  icon: <ExclamationCircleOutlined/>,
  okText: '确认',
  cancelText: '取消',
  onOk: onConfirm
});

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
      onClick={() => confirmDelete(() => deleteFn(record))}
      type='danger'
      size='small'
    >
      删除
    </Button>
  </Space>
);


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


const generateFilterJSON = ({primaryKeys, record}) => ({
  filter: _.pick(record, primaryKeys)
})


export default () => {

  const [colProp, setColProp] = useState({collectionName: '', primaryKeys: []})
  const [tableColumn, setTableColumn] = useState([]);
  const [cacheData, setCacheData] = useState([]);
  const [shouldRerenderRealDataTable, setShouldRerenderRealDataTable] = useState(false);
  const [realData, setRealData] = useState([]);
  const [rawStringData, setRawStringData] = useState('');

  const cleanStates = () => {
    setTableColumn([]);
    setColProp({collectionName: '', primaryKeys: []});
    setRealData([]);
  };


  // todo: if large numbers, fetch & display optimization is required
  const realTableDataQuery = async collectionName => {
    const rawData = await queryData(collectionName, {});
    setRealData(tableDataSourceAddKey(rawData));
  };

  useDidMountEffect(() => {
    realTableDataQuery(colProp.collectionName)
      .catch(err => console.log(`realTableDataQuery error: ${err}`));
  }, [shouldRerenderRealDataTable])


  const cacheTableActionDelete = record =>
    setCacheData(cacheData.filter(v => v.key !== record.key));

  // todo
  const cacheTableActionModify = record =>
    console.log('cacheTableActionModify: ', record);

  const realTableActionDelete = record => {
    const {collectionName, primaryKeys} = colProp;
    const param = generateFilterJSON({primaryKeys, record});

    deleteData(collectionName, param)
      .then(res => {
        message.success(`删除成功 ${res}`)
        setShouldRerenderRealDataTable(!shouldRerenderRealDataTable);
      })
      .catch(err => message.error(`删除失败 ${err}`));
  };

  // todo
  const realTableActionModify = record =>
    console.log('realTableActionModify: ', record);


  const genCacheTableColumn = () => antdTableColumnsAppendOperation(
    tableColumn,
    generateTableColRenderFn({
      modifyFn: cacheTableActionModify,
      deleteFn: cacheTableActionDelete
    })
  );
  const genRealTableColumn = () => antdTableColumnsAppendOperation(
    tableColumn,
    generateTableColRenderFn({
      modifyFn: realTableActionModify,
      deleteFn: realTableActionDelete
    })
  );


  const setCollectionProp = async collectionName => {
    const dce = await doesCollectionExist(collectionName);
    if (dce) {
      const collectionInfo = await showCollection(collectionName);
      const tc = antdTableColumnsGenerator(collectionInfo.fields);
      setTableColumn(tc);

      const pk = await showPrimaryKeys(collectionInfo.collectionName);
      setColProp({collectionName: collectionInfo.collectionName, primaryKeys: pk});

      await realTableDataQuery(collectionInfo.collectionName);
    } else cleanStates();

    return dce;
  };

  const readFromTextArea = ({target: {value}}) => setRawStringData(value);

  const cvtRawData = () => {
    const cd = convertRawStringData(tableColumn, rawStringData);
    setCacheData(tableDataSourceAddKey(cd))
  }

  const onSubmitUpload = () => {
    const pureData = cacheData.map(i => _.omit(i, ['key']))

    insertData(colProp.collectionName, pureData)
      .then(res => {
        setShouldRerenderRealDataTable(!shouldRerenderRealDataTable);
        message.success(`上传成功 ${res}`)
      })
      .catch(err => message.error(`上传失败 ${err}`));
  }

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
              dataSource={cacheData}
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
              onClick={() => confirmSubmit(onSubmitUpload)}
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
              dataSource={realData}
              size='small'
              pagination={false}
            />
          </Col>
        </Row>
      </div>
    </PageHeaderWrapper>
  );
};
