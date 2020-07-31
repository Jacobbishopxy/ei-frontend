/**
 * Created by Jacob Xie on 7/23/2020.
 */

import _ from 'lodash';
import { currentTimeStamp } from '@/utilities/utils';

export enum DbType {
  template = 'template',
  industry = 'industry',
  market = 'market',
}

export enum CategoryType {
  embedLink = 'embedLink',
  text = 'text',
  targetPrice = 'targetPrice',
  image = 'image',
  fileList = 'fileList',
  fileManager = 'fileManager',
  editableTable = 'editableTable',
  table = 'table',
  lines = 'lines',
  histogram = 'histogram',
  pie = 'pie',
  scatter = 'scatter',
  heatmap = 'heatmap',
  box = 'box',
  tree = 'tree',
  treeMap = 'treeMap',
}

export interface RawLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  static?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
  isBounded?: boolean;
}

export interface AnchorKey {
  identity: string;
  category: CategoryType;
}

export interface AnchorConfig {
  symbol?: string;
  date?: string;
}

export interface Anchor {
  anchorKey: AnchorKey;
  anchorConfig?: AnchorConfig;
}

export interface Content {
  data: string;
  config?: string;
}

export interface Store {
  anchorKey: AnchorKey;
  content: Content;
  anchorConfig?: AnchorConfig;
}

export interface Coordinate {
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface Element {
  anchorKey: AnchorKey;
  coordinate: Coordinate;
}

export interface TemplatePanel {
  template: string;
  panel: string;
}

export class Layout {
  constructor(public templatePanel: TemplatePanel,
              public layouts: Element[]) {
    this.templatePanel = templatePanel;
    this.layouts = layouts;
  }
}

export class LayoutWithStore {
  constructor(public templatePanel: TemplatePanel,
              public layouts: Element[],
              public stores: Store[]) {
    this.templatePanel = templatePanel;
    this.layouts = layouts;
    this.stores = stores;
  }
}


export const addElementToLayout = (layout: Layout, category: CategoryType): Layout => {
  const newElement: Element = {
    anchorKey: {
      identity: currentTimeStamp(),
      category
    },
    coordinate: {
      x: 0,
      y: Infinity,
      h: 12,
      w: 4,
    }
  };
  const newLayouts: Element[] = _.concat(layout.layouts, newElement);

  return new Layout(layout.templatePanel, newLayouts);
};

export const addStoreToStore = (stores: Store[], store: Store): Store[] =>
  _.concat(stores, store)

export const removeElementFromLayout = (layout: Layout, identity: string): Layout => {
  const newLayouts: Element[] = _.reject(layout.layouts, ele => (ele.anchorKey.identity === identity))

  return new Layout(layout.templatePanel, newLayouts);
};

export const updateElementInLayout = (layout: Layout, rawLayout: RawLayout[]): Layout => {
  const newLayouts: Element[] =
    _.zip(layout.layouts, rawLayout).map(item => {

      const ele: Element = item[0]!
      const rlo: RawLayout = item[1]!

      return {
        anchorKey: {
          ...ele.anchorKey,
        },
        coordinate: {
          x: rlo[1].x,
          y: rlo[1].y,
          h: rlo[1].h,
          w: rlo[1].w,
        }
      }
    });

  return new Layout(layout.templatePanel, newLayouts);
};



