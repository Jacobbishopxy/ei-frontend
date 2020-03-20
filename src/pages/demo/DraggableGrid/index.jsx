import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { message } from 'antd';
import RGL, { WidthProvider } from 'react-grid-layout';

import DataCard from '@/components/CustomPanel/DataCard';
import ControlCard from '@/components/CustomPanel/ControlCard';

import {
  updateModels,
  addModel,
  removeModel,
  getGridLayout,
  updateGridLayout,
  GridLayoutModel
} from '@/utilities/gridLayoutModel';

const ReactGridLayout = WidthProvider(RGL);


const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps)
};

const gridLayoutId = 'test';

const CustomGrid = () => {

  const [cards, setCards] = useState([]);
  const [counter, setCounter] = useState(0);
  const [saveLayout, setSaveLayout] = useState(0);

  useEffect(() => {
    getGridLayout(gridLayoutId)
      .then(res => res.json())
      .then(data => {
        setCards(data.layouts.map(lo => new GridLayoutModel(lo.coordinate, lo.content)))
      })
      .catch(err => console.log('getGridLayout', err))
  }, []);

  useDidMountEffect(() => {
    const saveMode = {
      id: gridLayoutId,
      layouts: cards
    };
    updateGridLayout(saveMode)
      .then(res => {
        if (res.ok) message.success('保存成功');
        else message.warn('保存失败，请联系管理员');
      })
      .catch(err => console.log('updateGridLayout', err))
  }, [saveLayout]);

  const onSelectSymbol = value => {
    console.log(value.target.value)
  };

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

  const createElement = (el, index) => {
    const {coordinate, content} = el;

    const saveContentCfg = ({title, hyperLink}) => {
      const newCards = cards.map((item, idx) => {
        if (idx === index) {
          if (title !== undefined)
            item.title = title;
          if (hyperLink !== undefined)
            item.hyperLink = hyperLink;
        }
        return item;
      });

      setCards(newCards);
    };

    return (
      <div key={coordinate.i} data-grid={coordinate}>
        <DataCard
          onRemoveItem={() => onRemoveItem(coordinate.i)}
          cardContent={content}
          saveContentCfg={saveContentCfg}
        />
      </div>
    );
  };

  const onSaveModule = () => setSaveLayout(saveLayout + 1);

  return (
    <PageHeaderWrapper>
      <ControlCard
        onSelectSymbol={onSelectSymbol}
        onAddModule={onAddItem}
        onSaveModule={onSaveModule}
      />
      <ReactGridLayout
        onLayoutChange={onLayoutChange}
        draggableHandle='.draggableZone'
        className='layout'
        cols={12}
        rowHeight={100}
      >
        {cards.map((ele, index) => createElement(ele, index))}
      </ReactGridLayout>
    </PageHeaderWrapper>
  )

};

export default CustomGrid;
