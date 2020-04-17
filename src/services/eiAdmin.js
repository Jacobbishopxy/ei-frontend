/**
 * Created by Jacob Xie on 4/17/2020.
 */

import request from '@/utils/request';


export const showCollections = async () =>
  request('/api/ei-admin/show-collections')

export const doesCollectionExist = async collectionName =>
  request(`/api/ei-admin/does-collection-exist?collection=${collectionName}`)

export const showCollection = async collectionName =>
  request(`/api/ei-admin/show-collection?collection=${collectionName}`)

export const createCollection = async json =>
  request('/api/ei-admin/create-collection', {method: 'POST', data: json})

export const modifyCollection = async json =>
  request('/api/ei-admin/modify-collection', {method: 'POST', data: json})

export const insertData = async (collectionName, json) =>
  request('/api/ei-admin/insert-data', {method: 'POST', data: json})

export const queryData = async (collectionName, json) =>
  request('/api/ei-admin/query-data', {method: 'POST', data: json})

export const deleteData = async (collectionName, json) =>
  request('/api/ei-admin/delete-data', {method: 'POST', data: json})

