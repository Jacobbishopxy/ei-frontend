/**
 * Created by Jacob Xie on 7/20/2020.
 */
import React from 'react';

import { categoryType } from '@/utilities/dashboardModel';
import { EmbedLinkContent } from '@/components/CustomDashboardHelper/ModuleCollections/EmbedLinkContent';
import { TextEditorContent } from '@/components/CustomDashboardHelper/ModuleCollections/TextEditorContent';
import { EditableTableContent } from '@/components/CustomDashboardHelper/ModuleCollections/EditableTableContent';
import { FileListContent } from '@/components/CustomDashboardHelper/ModuleCollections/FileListContent';
import { FileManagerContent } from '@/components/CustomDashboardHelper/ModuleCollections/FileManagerContent';
import { TargetPriceContent } from '@/components/CustomDashboardHelper/ModuleCollections/TargetPriceContent';

import styles from './index.less';


export const moduleList = [
  {
    key: 'misc',
    name: '功能',
    children: [
      {
        key: categoryType.embedLink,
        name: '链接',
        disabled: false,
      },
      {
        key: categoryType.text,
        name: '文字',
        disabled: false,
      },
      {
        key: categoryType.targetPrice,
        name: '目标价',
        disabled: false,
      },
      {
        key: categoryType.image,
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
        key: categoryType.fileList,
        name: '文件概览',
        disabled: false,
      },
      {
        key: categoryType.fileManager,
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
        key: categoryType.editableTable,
        name: '可编辑表',
        disabled: false,
      },
      {
        key: categoryType.table,
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
        key: categoryType.lines,
        name: '折线图',
        disabled: true,
      },
      {
        key: categoryType.histogram,
        name: '柱状图',
        disabled: true,
      },
      {
        key: categoryType.pie,
        name: '饼图',
        disabled: true,
      },
      {
        key: categoryType.scatter,
        name: '散点图',
        disabled: true,
      },
      {
        key: categoryType.heatmap,
        name: '热力图',
        disabled: true,
      },
      {
        key: categoryType.box,
        name: '箱图',
        disabled: true,
      },
      {
        key: categoryType.tree,
        name: '树图',
        disabled: true,
      },
      {
        key: categoryType.treeMap,
        name: '矩形树图',
        disabled: true,
      },
    ]
  },
];

export const selectModeToAdd = modeName => (initContent, saveContent, ref, headVisible) => {

  const contentStyles = headVisible ? styles.cardContent : styles.cardContentWithOutHead

  const defaultType = <EmbedLinkContent
    initContent={initContent}
    saveContent={saveContent}
    ref={ref}
    contentStyles={contentStyles}
  />;
  const textType = <TextEditorContent
    initContent={initContent}
    saveContent={saveContent}
    ref={ref}
    contentStyles={contentStyles}
  />;
  const editableTableContent = <EditableTableContent
    initContent={initContent}
    saveContent={saveContent}
    ref={ref}
    contentStyles={contentStyles}
  />;
  const listFileContent = <FileListContent
    initContent={initContent}
    saveContent={saveContent}
    ref={ref}
    contentStyles={contentStyles}
  />;
  const proFileContent = <FileManagerContent
    initContent={initContent}
    saveContent={saveContent}
    ref={ref}
    contentStyles={contentStyles}
  />;
  const targetPriceContent = <TargetPriceContent
    initContent={initContent}
    saveContent={saveContent}
    ref={ref}
    contentStyles={contentStyles}
  />;

  switch (modeName) {
    case 'embedLink':
      return defaultType;
    case 'table':
      return <h1>Table</h1>;
    case 'editableTable':
      return editableTableContent;
    case 'text':
      return textType;
    case 'image':
      return <h1>Img</h1>;
    case 'fileList':
      return listFileContent;
    case 'fileManager':
      return proFileContent;
    case 'targetPrice':
      return targetPriceContent;
    default:
      return defaultType;
  }
};
