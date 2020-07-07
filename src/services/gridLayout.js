/**
 * Created by Jacob Xie on 4/24/2020.
 */

import request from '@/utils/request';


export const getGridLayout = async (db, collection, symbol, panel) =>
  request(`/api/ei-grid-layout?db=${db}&collection=${collection}&symbol=${symbol}&panel=${panel}`)

export const updateGridLayout = async (db, collection, json) =>
  request(`/api/ei-grid-layout?db=${db}&collection=${collection}`, {method: 'POST', data: json});


