/**
 * Created by Jacob Xie on 7/30/2020.
 */

import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import RGL, { WidthProvider } from 'react-grid-layout';

import { useDidMountEffect } from '@/utilities/utils';

import * as dashboardModel from '@/utilities/dashboardModel';
import * as dashboardService from '@/services/eiDashboard';

import { DashboardEditor } from '@/components/DashboardHelper/DashboardController/DashboardEditor';
import { ElementGenerator } from '@/components/DashboardHelper/ElementGenerator';
import { DashboardProps } from './data';

import styles from './Dashboard.less';

const ReactGridLayout = WidthProvider(RGL);

const genEmptyLayout = (tp: dashboardModel.TemplatePanel): dashboardModel.Layout =>
  new dashboardModel.Layout(tp, [])


export const Dashboard: React.FC<DashboardProps> = (props) => {

  const [layout, setLayout] = useState<dashboardModel.Layout>(genEmptyLayout(props.templatePanel));
  const [stores, setStores] = useState<dashboardModel.Store[]>([]);
  const [layoutSaveTrigger, setLayoutSaveTrigger] = useState<number>(0);
  const [dashboardOnEdit, setDashboardOnEdit] = useState<boolean>(false);
  const [globalConfig, setGlobalConfig] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    dashboardService
      .fetchLayout(props.collection, props.templatePanel)
      .then(data => {if (data !== null) setLayout(data) });
  }, [props.templatePanel]);

  useDidMountEffect(() => {

    const layoutWithStore = new dashboardModel.LayoutWithStore(props.templatePanel, layout.layouts, stores!);

    dashboardService
      .modifyLayoutStore(props.collection, layoutWithStore)
      .then(() => message.success('保存成功'))
      .catch(() => message.warn('保存失败'));

  }, [layoutSaveTrigger]);

  // todo: add symbol selector
  const onChangeSymbol = (value: string) =>
    setGlobalConfig({...globalConfig, symbol: value})

  const onAddElementToLayout = (selectedCategory: dashboardModel.CategoryType) =>
    setLayout(dashboardModel.addElementToLayout(layout, selectedCategory))

  const onChangeLayout = (rawLayout: dashboardModel.RawLayout[]) =>
    setLayout(dashboardModel.updateElementInLayout(layout, rawLayout))

  const onRemoveElementFromLayout = (value: string) =>
    setLayout(dashboardModel.removeElementFromLayout(layout, value));

  const onSaveModule = () =>
    setLayoutSaveTrigger(layoutSaveTrigger + 1);

  const elementSaveStore = (value: dashboardModel.Store) =>
    setStores(dashboardModel.addStoreToStore(stores!, value))


  return (
    <div className={styles.main}>
      <div className={styles.controlMain}>
        <DashboardEditor
          onAddModule={onAddElementToLayout}
          onSaveModule={onSaveModule}
          onEditModule={setDashboardOnEdit}
        />
      </div>

      <ReactGridLayout
        onLayoutChange={onChangeLayout}
        draggableHandle=".draggableZone"
        className="layout"
        isDraggable={dashboardOnEdit}
        isResizable={dashboardOnEdit}
        cols={24}
        rowHeight={100}
        margin={[5, 5]}
        containerPadding={[10, 10]}
      >
        {
          layout.layouts.map(ele => (
            <ElementGenerator
              key={ele.anchorKey.identity}
              collection={props.collection}
              globalConfig={globalConfig}
              element={ele}
              removeElement={onRemoveElementFromLayout}
              saveStore={elementSaveStore}
            />
          ))
        }
      </ReactGridLayout>

    </div>
  )
}
