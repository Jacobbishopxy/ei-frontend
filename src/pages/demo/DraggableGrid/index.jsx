import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import RGL, { WidthProvider } from 'react-grid-layout';

import DataCard from '@/components/CustomPanel/DataCard';
import ControlCard from '@/components/CustomPanel/ControlCard';
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


const gridLayoutPanel = 'test';

const CustomGrid = () => {

  const [cards, setCards] = useState([]);
  const [counter, setCounter] = useState(0);
  const [saveLayout, setSaveLayout] = useState(0);

  useEffect(() => {
    getGridLayout(gridLayoutPanel)
      .then(data => {
        setCards(data.layouts.map(lo => new GridLayoutModel(lo.coordinate, lo.content)))
      })
      .catch(err => message.warn(`获取失败 ${err}`))
  }, []);

  useDidMountEffect(() => {
    const saveMode = {
      panel: gridLayoutPanel,
      layouts: cards
    };
    updateGridLayout(saveMode)
      .then(res => {
        if (res.ok) message.success('保存成功');
        else message.warn('保存失败，请联系管理员');
      })
      .catch(err => message.warn(`保存失败 ${err}`))
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
