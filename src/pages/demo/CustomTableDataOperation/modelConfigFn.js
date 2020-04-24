/**
 * Created by Jacob Xie on 3/10/2020.
 */

import _ from 'lodash';
import Papa from 'papaparse';
import { message } from 'antd';

export const antdTableColumnsGenerator = collectionFields =>
  collectionFields.map(item => ({
    title: item.nameAlias,
    dataIndex: item.fieldName,
    key: item.fieldName
  }));

export const antdTableColumnsAppendOperation = (tableCols, renderFn) => {
  if (tableCols.length === 0) return [];
  return tableCols.concat({
    title: '操作',
    key: 'operation',
    render: renderFn
  });
};

export const tableDataSourceAddKey = data =>
  data.map((item, index) => ({
    key: index,
    ...item
  }));

/**
 * convert raw string to JSON data
 */

const papaConfig = {
  skipEmptyLines: true,
  header: true,
  dynamicTyping: true
};

const getNameAndAlias = tableCols => {
  const names = tableCols.map(({key}) => key)
  const alias = tableCols.map(({title}) => title)
  const map = _.zipObject(alias, names)

  return {
    names,
    alias,
    map
  };
};

export const convertRawStringData = (tableCols, rawString) => {

  if (tableCols.length === 0) {
    message.error('无法识别目标字段');
    return [];
  }

  const cd = Papa.parse(rawString, papaConfig).data;
  if (cd.length === 0) {
    message.error('转换失败，请检查数据');
    return [];
  }

  const naa = getNameAndAlias(tableCols)
  const dataDroppedIllegal = cd.filter(item => _.intersection(_.keys(item), naa.alias).length !== 0)
  if (dataDroppedIllegal.length === 0) {
    message.error('转换失败，请检查数据');
    return [];
  }

  message.success('转换成功');
  return dataDroppedIllegal.map(item => _.mapKeys(item, (v, k) => naa.map[k]));
};
