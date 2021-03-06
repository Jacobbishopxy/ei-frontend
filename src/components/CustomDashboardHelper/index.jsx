/**
 * Created by Jacob Xie on 4/27/2020.
 */

import React, {useState, useEffect} from 'react';
import {message} from 'antd';
import RGL, {WidthProvider} from 'react-grid-layout';

import {DataCard} from '@/components/CustomDashboardHelper/DashboardModulePanel';
import {SymbolSelector} from '@/components/CustomDashboardHelper/DashboardController/SymbolSelector';
import {DashboardEditor} from '@/components/CustomDashboardHelper/DashboardController/DashboardEditor';
import {useDidMountEffect} from '@/utilities/utils';

import {
  updateModels,
  addModel,
  removeModel,
  GridLayoutModel
} from '@/utilities/gridLayoutModel';
import {
  getGridLayout,
  updateGridLayout,
} from '@/services/eiDashboard';

import styles from './index.less';


const ReactGridLayout = WidthProvider(RGL);


export const CustomDashboard = ({db, collection, panel, symbolList, defaultSymbol}) => {

  const [cards, setCards] = useState([]);
  const [counter, setCounter] = useState(0);
  const [saveLayout, setSaveLayout] = useState(0);
  const [dashboardOnEdit, setDashboardOnEdit] = useState(false);
  const [template, setTemplate] = useState(defaultSymbol);

  useEffect(() => {
    setTemplate(defaultSymbol)
  }, [defaultSymbol])

  useEffect(() => {
    getGridLayout(db, collection, template, panel)
      .then(data => {
        setCards(data.layouts.map(lo => new GridLayoutModel(lo.coordinate, lo.content)))
      })
      .catch(err => message.warn(`获取失败 ${err}`))
  }, [template]);

  useDidMountEffect(() => {
    const saveMode = {
      template,
      panel,
      layouts: cards
    };

    updateGridLayout(db, collection, saveMode)
      .then(() => {
        message.success(`保存成功`)
      })
      .catch(() => {
        message.warn(`保存失败`)
      });
  }, [saveLayout]);

  const onAddItem = selectedMode => {
    const newModel = addModel(counter, cards, selectedMode);
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

  const createElement = (el, index) => {
    const {coordinate, content} = el;

    const removeItem = () => onRemoveItem(coordinate.i);

    const saveContent = ({title, contentData, contentConfig}) => {
      const newCards = cards.map((item, idx) => {
        if (idx === index) {
          let newItem;
          if (title !== undefined)
            newItem = {...item, content: {...item.content, title}};
          if (contentData !== undefined)
            newItem = {...item, content: {...item.content, contentData, contentConfig}};
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
          headVisible={dashboardOnEdit}
        />
      </div>
    );
  };

  const onSaveModule = () => setSaveLayout(saveLayout + 1);

  const onChangeSymbol = value => setTemplate(value)

  return (
    <div className={styles.main}>
      <div className={styles.controlMain}>
        <SymbolSelector
          className={styles.content}
          onChangeSymbol={onChangeSymbol}
          symbolList={symbolList}
          defaultSymbol={template}
        />
        <DashboardEditor
          className={styles.content}
          onAddModule={onAddItem}
          onEditModule={setDashboardOnEdit}
          onSaveModule={onSaveModule}
        />
      </div>

      <ReactGridLayout
        onLayoutChange={onLayoutChange}
        draggableHandle='.draggableZone'
        className='layout'
        isDraggable={dashboardOnEdit}
        isResizable={dashboardOnEdit}
        cols={24}
        rowHeight={100}
        margin={[5, 5]}
        containerPadding={[10, 10]}
      >
        {cards.map((ele, index) => createElement(ele, index))}
      </ReactGridLayout>
    </div>
  )

};

export default CustomDashboard;
