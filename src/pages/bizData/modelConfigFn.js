/**
 * Created by Jacob Xie on 3/10/2020.
 */

import _ from 'lodash';

export const antdTableColumnsGenerator = headConfigs =>
  headConfigs.map((item, index) => ({
    title: item.name,
    dataIndex: item.key,
    key: index
  }));

export const getHeadConfigsTitle = headConfigs =>
  headConfigs.map(item => item.name);

export const getHeadConfigsMappingKeyName = headConfigs => {
  const result = {};
  headConfigs.forEach(item => {
    result[item.key] = item.name
  });
  return result;
};

export const getHeadConfigsMappingNameKey = headConfigs => {
  const result = {};
  headConfigs.forEach(item => {
    result[item.name] = item.key
  });
  return result;
};

export const rawDataKeysConvert = (rawData, nameKeyMapping) =>
  rawData.map((item, index) => {
    const newItem = _.mapKeys(item, (v, k) => nameKeyMapping[k]);
    return {...newItem, key: index}
  });
