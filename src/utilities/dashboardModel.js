/**
 * Created by Jacob Xie on 7/23/2020.
 */

import _ from 'lodash';
import { currentTimeStamp } from '@/utilities/utils';

// todo: change model to Typescript

export const categoryType = {
  embedLink: 'embedLink',
  text: 'text',
  targetPrice: 'targetPrice',
  image: 'image',
  fileList: 'fileList',
  fileManager: 'fileManager',
  editableTable: 'editableTable',
  table: 'table',
  lines: 'lines',
  histogram: 'histogram',
  pie: 'pie',
  scatter: 'scatter',
  heatmap: 'heatmap',
  box: 'box',
  tree: 'tree',
  treeMap: 'treeMap',
}


class TemplatePanel {
  constructor(template, panel) {
    this.template = template;
    this.panel = panel;
  }
}

class Coordinate {
  constructor(x, y, h, w) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
  }
}

class AnchorKey {
  constructor(identity, category) {
    this.identity = identity;
    this.category = category;
  }
}

class Element {
  constructor(anchorKey, coordinate) {
    this.anchorKey = anchorKey;
    this.coordinate = coordinate;
  }
}

class AnchorConfig {
  constructor(symbol, date) {
    this.symbol = symbol;
    this.date = date;
  }
}

class Content {
  constructor(data, config) {
    this.data = data;
    this.config = config;
  }
}


export const addModel = category => {
  const anchorKey = new AnchorKey(currentTimeStamp(), category);
  const coord = new Coordinate(0, Infinity, 12, 4);

  return new Element(anchorKey, coord);
};

export const removeModel = (layouts, identity) =>
  _.reject(layouts, k => (k.anchorKey.ideal === identity));


export const updateRawLayouts = (prevRawLayout, currRawLayout) =>
  _.zip(prevRawLayout, currRawLayout).map(item => ({
    i: item[1].i,
    x: item[1].x,
    y: item[1].y,
    h: item[1].h,
    w: item[1].w,
  }));

export const generateRawLayout = (layout) =>
  layout.layouts.map(item => ({
    i: item.anchorKey.identity,
    x: item.coordinate.x,
    y: item.coordinate.y,
    h: item.coordinate.h,
    w: item.coordinate.w,
  }));
