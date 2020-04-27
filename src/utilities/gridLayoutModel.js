/**
 * Created by Jacob Xie on 3/17/2020.
 */

import _ from 'lodash';
import { currentTimeStamp } from '@/utilities/utils';

/**
 * coordinate: {
 *  i: unique key
 *  x: x location
 *  y: y location
 *  h: height
 *  w: width
 * }
 *
 * content: {
 *   title: card title
 *   type: card type
 *   hyperLink: link/mapping key
 * }
 */
export class GridLayoutModel {
  constructor(coordinate, content) {
    this.coordinate = coordinate;
    this.content = content;
  }

  get i() {
    return this.coordinate.i;
  }

  set i(v) {
    this.coordinate.i = v;
  }

  get x() {
    return this.coordinate.x;
  }

  set x(v) {
    this.coordinate.x = v;
  }

  get y() {
    return this.coordinate.y;
  }

  set y(v) {
    this.coordinate.y = v;
  }

  get h() {
    return this.coordinate.h;
  }

  set h(v) {
    this.coordinate.h = v;
  }

  get w() {
    return this.coordinate.w;
  }

  set w(v) {
    this.coordinate.x = v;
  }

  get title() {
    return this.content.title;
  }

  set title(v) {
    this.content.title = v;
  }

  get contentType() {
    return this.content.contentType;
  }

  set contentType(v) {
    this.content.contentType = v;
  }

  get hyperLink() {
    return this.content.hyperLink;
  }

  set hyperLink(v) {
    this.content.hyperLink = v;
  }
}


export const addModel = (i, currentLayout, contentType) => {
  const coordinate = {
    i: `${currentTimeStamp()}`,
    x: (currentLayout.length * 6) % 12,
    y: Infinity,
    w: 6,
    h: 4,
  };
  const content = {
    title: '',
    contentType,
    hyperLink: ''
  };
  return new GridLayoutModel(coordinate, content);
};

export const removeModel = (cards, i) =>
  _.reject(cards, k => (k.coordinate.i === i));


/**
 * 增加/删除/修改模型布局 触发改函数
 * @param cards
 * @param currentLayout
 */
export const updateModels = (cards, currentLayout) =>
  _.zip(cards, currentLayout).map(item => {
    const cd = {
      i: item[1].i,
      x: item[1].x,
      y: item[1].y,
      h: item[1].h,
      w: item[1].w,
    };
    return new GridLayoutModel(cd, item[0].content)
  });

