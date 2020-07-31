/**
 * Created by Jacob Xie on 4/24/2020.
 */

import request from '@/utils/request';
import * as dashboardModel from '@/utilities/dashboardModel';


export const getGridLayout = async (db, collection, template, panel) =>
  request(`/api/ei-grid-layout?db=${db}&collection=${collection}&template=${template}&panel=${panel}`)

export const updateGridLayout = async (db, collection, json) =>
  request(`/api/ei-grid-layout?db=${db}&collection=${collection}`, {method: 'POST', data: json});


/**
 * store & stores
 */

export const fetchStore = async (collection: string,
                                 data: dashboardModel.Anchor): Promise<dashboardModel.Store> =>
  request(`/api/dashboard-store-fetch?collection=${collection}`, {method: 'POST', data});

export const fetchStores = async (collection: string,
                                  data: dashboardModel.Anchor[]): Promise<dashboardModel.Store[]> =>
  request(`/api/dashboard-stores-fetch?collection=${collection}`, {method: 'POST', data});


export const modifyStore = async (collection: string, data: dashboardModel.Store) =>
  request(`/api/dashboard-store-modify?collection=${collection}`, {method: 'POST', data});

export const modifyStores = async (collection: string, data: dashboardModel.Store[]) =>
  request(`/api/dashboard-stores-modify?collection=${collection}`, {method: 'POST', data});


export const removeStore = async (collection: string, data: dashboardModel.Anchor) =>
  request(`/api/dashboard-store-remove?collection=${collection}`, {method: 'POST', data});

export const removeStores = async (collection: string, data: dashboardModel.Anchor[]) =>
  request(`/api/dashboard-stores-remove?collection=${collection}`, {method: 'POST', data});


/**
 * layout
 */

export const fetchLayout = async (collection: string,
                                  data: dashboardModel.TemplatePanel): Promise<dashboardModel.Layout> =>
  request(`/api/dashboard-layout-fetch?collection=${collection}`, {method: 'POST', data});

export const modifyLayout = async (collection: string, data: dashboardModel.Layout) =>
  request(`/api/dashboard-layout-modify?collection=${collection}`, {method: 'POST', data});

export const removeLayout = async (collection: string, data: dashboardModel.TemplatePanel) =>
  request(`/api/dashboard-layout-remove?collection=${collection}`, {method: 'POST', data});


/**
 * layout
 */

export const modifyLayoutStore = async (collection: string, data: dashboardModel.LayoutWithStore) =>
  request(`/api/dashboard-layout-store-modify?collection=${collection}`, {method: 'POST', data});
