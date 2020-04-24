/**
 * Created by Jacob Xie on 4/17/2020.
 */

import _ from 'lodash';
import request from '@/utils/request';


export const showCollections = async () =>
  request('/api/ei-admin/show-collections');

export const doesCollectionExist = async collectionName =>
  request(`/api/ei-admin/does-collection-exist?collection=${collectionName}`);

export const showCollection = async collectionName => {
  const collectionInfo = await request(`/api/ei-admin/show-collection?collection=${collectionName}`);
  const {fields} = collectionInfo;
  return {
    collectionName,
    fields: _.orderBy(fields, ['indexOption'])
  };
};

export const createCollection = async json =>
  request('/api/ei-admin/create-collection', {method: 'POST', data: json});

export const modifyCollection = async json =>
  request('/api/ei-admin/modify-collection', {method: 'POST', data: json});

export const showPrimaryKeys = async collectionName => {
  const rawRes = await request(`/api/ei-admin/show-index?collection=${collectionName}`)
  const {key} = rawRes[1]
  return _.keys(key)
};

export const insertData = async (collectionName, json) =>
  request(`/api/ei-admin/insert-data?collection=${collectionName}`, {method: 'POST', data: json});

export const queryData = async (collectionName, json) =>
  request(`/api/ei-admin/query-data?collection=${collectionName}`, {method: 'POST', data: json});

export const deleteData = async (collectionName, json) =>
  request(`/api/ei-admin/delete-data?collection=${collectionName}`, {method: 'POST', data: json});

