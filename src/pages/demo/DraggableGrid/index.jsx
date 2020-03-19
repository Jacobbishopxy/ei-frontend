import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';

import DataCard from '@/components/CustomPanel/DataCard';
import ControlCard from '@/components/CustomPanel/ControlCard';
import EmbedLinkContent from '@/components/CustomPanel/EmbedLinkContent';

import { updateModels, addModel, removeModel } from '@/utilities/gridLayoutModel';

const ReactGridLayout = WidthProvider(RGL);

const selectModeToAdd = modeName => {

  switch (modeName) {
    case 'embedLink':
      return <EmbedLinkContent/>;
    case 'table':
      return <h1>Table</h1>;
    case 'text':
      return <h1>Text</h1>;
    case 'image':
      return <h1>Img</h1>;
    default:
      return <EmbedLinkContent/>;
  }
};

const CustomGrid = () => {

  const [cards, setCards] = useState([]);
  const [counter, setCounter] = useState(0);

  const onSelectSymbol = value => {
    console.log(value.target.value)
  };

  const onAddItem = selectedMode => {
    const sm = selectedMode.key;
    const newModel = addModel(counter, cards, sm);
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

  const createElement = el => {
    const {coordinate, content} = el;

    return (
      <div key={coordinate.i} data-grid={coordinate}>
        <DataCard
          onRemoveItem={() => onRemoveItem(coordinate.i)}
          cardContent={selectModeToAdd(content.type)}
        />
      </div>
    );
  };

  const onSaveModule = () => {
    console.log(cards);

  };

    return (
      <PageHeaderWrapper>
        <ControlCard
          onSelectSymbol={onSelectSymbol}
          onAddModule={onAddItem}
          onSaveModule={onSaveModule}  // todo: 需要连接后端API保存配置与mongoDB
        />
        <ReactGridLayout
          onLayoutChange={onLayoutChange}
          draggableHandle='.draggableZone'
          className='layout'
          cols={12}
          rowHeight={100}
        >
          {cards.map(createElement)}
        </ReactGridLayout>
      </PageHeaderWrapper>
    )

};

export default CustomGrid;
