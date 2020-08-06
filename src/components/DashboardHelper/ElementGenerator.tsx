/**
 * Created by Jacob Xie on 8/5/2020.
 */


import React, { useEffect, useState } from 'react';

import * as dashboardModel from '@/utilities/dashboardModel';
import { ModulePanel } from '@/components/DashboardHelper/DashboardModulePanel/ModulePanel';
import { fetchStore } from '@/services/eiDashboard';
import { ElementGeneratorProps } from './data';


export const ElementGenerator = (props: ElementGeneratorProps) => {

  const [content, setContent] = useState<dashboardModel.Content | null>(null);

  const {anchorKey, coordinate} = props.element;
  const anchor: dashboardModel.Anchor = {
    anchorKey,
    anchorConfig: props.globalConfig as dashboardModel.AnchorConfig
  }

  useEffect(() => {
    fetchStore(props.collection, anchor)
      .then(res => setContent(res.content)) // todo: here is null! should have empty content here!!!
      .catch(err => console.log(err));
  });

  const saveContent = (value: dashboardModel.Content) =>
    props.saveStore({...anchor, content: value})


  return (
    <div key={anchorKey.identity} data-grid={coordinate}>
      <ModulePanel
        globalConfig={props.globalConfig}
        onRemove={props.removeElement}
        category={props.element.anchorKey.category}
        content={content}
        saveContent={saveContent}
        headVisible
      />
    </div>
  );
};

