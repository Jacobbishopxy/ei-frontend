/**
 * Created by Jacob Xie on 3/17/2020.
 */

import _ from 'lodash';

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

  get x() {
    return this.coordinate.x;
  }

  get y() {
    return this.coordinate.y;
  }

  get h() {
    return this.coordinate.h;
  }

  get w() {
    return this.coordinate.w;
  }

  get title() {
    return this.content.title;
  }

  get type() {
    return this.content.type;
  }

  get hyperLink() {
    return this.content.hyperLink;
  }
}


export const addModel = (i, currentLayout, type) => {
  const coordinate = {
    i: i.toString(),
    x: (currentLayout.length * 6) % 12,
    y: Infinity,
    w: 6,
    h: 4,
  };
  const content = {
    title: '',
    type,
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
  _.zip(cards, currentLayout).map(item => new GridLayoutModel(item[1], item[0].content));


