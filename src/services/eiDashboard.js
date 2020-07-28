/**
 * Created by Jacob Xie on 4/24/2020.
 */

import request from '@/utils/request';


export const getGridLayout = async (db, collection, template, panel) =>
  request(`/api/ei-grid-layout?db=${db}&collection=${collection}&template=${template}&panel=${panel}`)

export const updateGridLayout = async (db, collection, json) =>
  request(`/api/ei-grid-layout?db=${db}&collection=${collection}`, {method: 'POST', data: json});


/**
 * store & stores
 */

export const fetchStore = async (collection, json) =>
  request(`/api/dashboard-store-fetch?collection=${collection}`, {method: 'POST', data: json});

export const fetchStores = async (collection, json) =>
  request(`/api/dashboard-stores-fetch?collection=${collection}`, {method: 'POST', data: json});


export const modifyStore = async (collection, json) =>
  request(`/api/dashboard-store-modify?collection=${collection}`, {method: 'POST', data: json});

export const modifyStores = async (collection, json) =>
  request(`/api/dashboard-stores-modify?collection=${collection}`, {method: 'POST', data: json});


export const removeStore = async (collection, json) =>
  request(`/api/dashboard-store-remove?collection=${collection}`, {method: 'POST', data: json});

export const removeStores = async (collection, json) =>
  request(`/api/dashboard-stores-remove?collection=${collection}`, {method: 'POST', data: json});


/**
 * layout
 */

export const fetchLayout = async (collection, json) =>
  request(`/api/dashboard-layout-fetch?collection=${collection}`, {method: 'POST', data: json});

export const modifyLayout = async (collection, json) =>
  request(`/api/dashboard-layout-modify?collection=${collection}`, {method: 'POST', data: json});

export const removeLayout = async (collection, json) =>
  request(`/api/dashboard-layout-remove?collection=${collection}`, {method: 'POST', data: json});


/**
 * layout
 */

export const modifyLayoutStore = async (collection, json) =>
  request(`/api/dashboard-layout-store-modify?collection=${collection}`, {method: 'POST', data: json});
