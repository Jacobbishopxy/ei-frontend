/**
 * Created by Jacob Xie on 7/31/2020.
 */

import React from 'react';

import { CategoryType } from '@/utilities/dashboardModel';

import styles from './ModulePanel.less';

export const moduleList = [
  {
    key: 'misc',
    name: '功能',
    children: [
      {
        key: CategoryType.embedLink,
        name: '链接',
        disabled: false,
      },
      {
        key: CategoryType.text,
        name: '文字',
        disabled: false,
      },
      {
        key: CategoryType.targetPrice,
        name: '目标价',
        disabled: false,
      },
      {
        key: CategoryType.image,
        name: '图片',
        disabled: true,
      },
    ]
  },
  {
    key: 'file',
    name: '文件',
    children: [
      {
        key: CategoryType.fileList,
        name: '文件概览',
        disabled: false,
      },
      {
        key: CategoryType.fileManager,
        name: '文件管理',
        disabled: false,
      },
    ]
  },
  {
    key: 'table',
    name: '表格',
    children: [
      {
        key: CategoryType.editableTable,
        name: '可编辑表',
        disabled: false,
      },
      {
        key: CategoryType.table,
        name: '表格',
        disabled: true,
      },
    ],
  },
  {
    key: 'graph',
    name: '图形',
    children: [
      {
        key: CategoryType.lines,
        name: '折线图',
        disabled: true,
      },
      {
        key: CategoryType.histogram,
        name: '柱状图',
        disabled: true,
      },
      {
        key: CategoryType.pie,
        name: '饼图',
        disabled: true,
      },
      {
        key: CategoryType.scatter,
        name: '散点图',
        disabled: true,
      },
      {
        key: CategoryType.heatmap,
        name: '热力图',
        disabled: true,
      },
      {
        key: CategoryType.box,
        name: '箱图',
        disabled: true,
      },
      {
        key: CategoryType.tree,
        name: '树图',
        disabled: true,
      },
      {
        key: CategoryType.treeMap,
        name: '矩形树图',
        disabled: true,
      },
    ]
  },
]

export function selectModuleToAdd(moduleName: CategoryType) {

}

