/**
 * Created by Jacob Xie on 4/24/2020.
 */

import request from '@/utils/request';


export const getGridLayout = async panel =>
  request(`/api/ei-grid-layout?panel=${panel}`)

export const updateGridLayout = async json =>
  request('/api/ei-grid-layout', {method: 'POST', data: json});


