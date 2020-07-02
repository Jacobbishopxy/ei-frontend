/**
 * Created by Jacob Xie on 4/27/2020.
 */

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import RGL, { WidthProvider } from 'react-grid-layout';

import { DataCard } from '@/components/CustomDashboardHelper/ModulePanel';
import { ControlCard } from '@/components/CustomDashboardHelper/DashboardController';
import { useDidMountEffect } from '@/utilities/utils';

import {
  updateModels,
  addModel,
  removeModel,
  GridLayoutModel
} from '@/utilities/gridLayoutModel';
import {
  getGridLayout,
  updateGridLayout,
} from '@/services/gridLayout';

const ReactGridLayout = WidthProvider(RGL);


export const CustomDashboard = ({panelName}) => {

  const [cards, setCards] = useState([]);
  const [counter, setCounter] = useState(0);
  const [saveLayout, setSaveLayout] = useState(0);
  const [dashboardOnEdit, setDashboardOnEdit] = useState(false);

  useEffect(() => {
    getGridLayout(panelName)
      .then(data => {
        setCards(data.layouts.map(lo => new GridLayoutModel(lo.coordinate, lo.content)))
      })
      .catch(err => message.warn(`获取失败 ${err}`))
  }, []);

  useDidMountEffect(() => {
    const saveMode = {
      panel: panelName,
      layouts: cards
    };
    updateGridLayout(saveMode)
      .then(res => {
        // console.log(res);
        message.success(`保存成功`)
      })
      .catch(err => {
        // console.log(err);
        message.warn(`保存失败`)
      });
  }, [saveLayout]);

  const onAddItem = selectedMode => {
    const newModel = addModel(counter, cards, selectedMode.key);
    const newCards = cards.concat(newModel);
    setCards(newCards);
    setCounter(counter + 1);
  };

  const onLayoutChange = currentLayout => {
    const newCards = updateModels(cards, currentLayout);
    setCards(newCards);
  };

  const onRemoveItem = i => {
    const newCards = removeModel(cards, i);
    setCards(newCards)
  };

  const createElement = (el, index, onEdit) => {
    const {coordinate, content} = el;

    const removeItem = () => onRemoveItem(coordinate.i);

    const saveContent = ({title, contentData}) => {
      const newCards = cards.map((item, idx) => {
        if (idx === index) {
          let newItem;
          if (title !== undefined) newItem = {...item, content: {...item.content, title}};
          if (contentData !== undefined) newItem = {...item, content: {...item.content, contentData}};
          return newItem;
        }
        return item;
      });
      setCards(newCards);
    };

    return (
      <div key={coordinate.i} data-grid={coordinate}>
        <DataCard
          onRemove={removeItem}
          initContent={content}
          saveContent={saveContent}
          headVisible={onEdit}
        />
      </div>
    );
  };

  const onSaveModule = () => setSaveLayout(saveLayout + 1);

  return (
    <PageHeaderWrapper>
      <ControlCard
        onAddModule={onAddItem}
        onEditModule={() => setDashboardOnEdit(!dashboardOnEdit)}
        onSaveModule={onSaveModule}
      />
      <ReactGridLayout
        onLayoutChange={onLayoutChange}
        draggableHandle='.draggableZone'
        className='layout'
        isDraggable={dashboardOnEdit}
        isResizable={dashboardOnEdit}
        cols={24}
        rowHeight={100}
        margin={[5, 5]}
      >
        {cards.map((ele, index) => createElement(ele, index, dashboardOnEdit))}
      </ReactGridLayout>
    </PageHeaderWrapper>
  )

};

export default CustomDashboard;
