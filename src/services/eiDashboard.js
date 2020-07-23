/**
 * Created by Jacob Xie on 4/24/2020.
 */

import request from '@/utils/request';


export const getGridLayout = async (db, collection, template, panel) =>
  request(`/api/ei-grid-layout?db=${db}&collection=${collection}&template=${template}&panel=${panel}`)

export const updateGridLayout = async (db, collection, json) =>
  request(`/api/ei-grid-layout?db=${db}&collection=${collection}`, {method: 'POST', data: json});


export const getStore = async (collection, identity, category) =>
  request(`/api/dashboard-store?collection=${collection}&identity=${identity}&category=${category}`)

export const updateStore = async (collection, json) =>
  request(`/api/dashboard-store?collection=${collection}`, {method: 'POST', data: json})

export const getLayout = async (collection, identity, category) =>
  request(`/api/dashboard-store?collection=${collection}&identity=${identity}&category=${category}`)

export const updateLayout = async (collection, json) =>
  request(`/api/dashboard-store?collection=${collection}`, {method: 'POST', data: json})


