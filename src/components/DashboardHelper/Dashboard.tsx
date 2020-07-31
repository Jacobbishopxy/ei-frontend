/**
 * Created by Jacob Xie on 7/30/2020.
 */

import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import RGL, { WidthProvider } from 'react-grid-layout';

import { useDidMountEffect } from '@/utilities/utils';

import * as dashboardModel from '@/utilities/dashboardModel';
import * as dashboardService from '@/services/eiDashboard';


const ReactGridLayout = WidthProvider(RGL);

export interface DashboardProps {
  layoutDb: dashboardModel.DbType;
  storeDb: dashboardModel.DbType;
  collection: string;
  templatePanel: dashboardModel.TemplatePanel;
  hasSymbolSelector: boolean;
}

export const Dashboard: React.FC<DashboardProps> = (props) => {

  const [layouts, setLayouts] = useState<dashboardModel.Layout>();
  const [stores, setStores] = useState<dashboardModel.Store[]>();
  const [layoutSaveTrigger, setLayoutSaveTrigger] = useState<number>(0);
  const [dashboardOnEdit, setDashboardOnEdit] = useState<boolean>(false);
  // const [globalConfig, setGlobalConfig] = useState();

  useEffect(() => {
    dashboardService
      .fetchLayout(props.collection, props.templatePanel)
      .then(data => setLayouts(data));
  }, [props.templatePanel])

  useDidMountEffect(() => {

    const layoutWithStore = new dashboardModel.LayoutWithStore(props.templatePanel, layouts!.layouts, stores!);

    dashboardService
      .modifyLayoutStore(props.collection, layoutWithStore)
      .then(() => message.success('保存成功'))
      .catch(() => message.warn('保存失败'));

  }, [layoutSaveTrigger])


  const onAddElementToLayout = (selectedCategory: dashboardModel.CategoryType) =>
    dashboardModel.addElementToLayout(layouts!, selectedCategory)

  const onChangeLayout = (rawLayout: dashboardModel.RawLayout[]) =>
    dashboardModel.updateElementInLayout(layouts!, rawLayout)

  const onRemoveElementFromLayout = (identity: string) =>
    dashboardModel.removeElementFromLayout(layouts!, identity)


  const generateElement = (element: dashboardModel.Element, index: number) => {

    const {anchorKey, coordinate} = element;

    const removeItem = () =>
      onRemoveElementFromLayout(anchorKey.identity);

    const saveElement = (store: dashboardModel.Store) =>
      dashboardModel.addStoreToStore(stores!, store)

    return (
      <div key={anchorKey.identity} data-grid={coordinate}>
        pass
      </div>
    )

  }


  return (
    <div>{233}</div>
  )
}
