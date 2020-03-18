import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
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

export default class CustomGrid extends React.PureComponent {

  static defaultProps = {
    className: 'layout',
    cols: 12,
    rowHeight: 100,
  };

  constructor(props) {
    super(props);

    this.state = {
      cards: [],  // todo: componentDidMount需要从后端获取配置信息
      newCounter: 0
    };
  }

  onSelectSymbol = value => {
    console.log(value.target.value)
  };

  onAddItem = selectedMode => {
    const sm = selectedMode.key;
    const {cards, newCounter} = this.state;
    const newModel = addModel(newCounter, cards, sm);
    const newCards = cards.concat(newModel);
    this.setState({cards: newCards, newCounter: newCounter + 1});
  };

  onLayoutChange = currentLayout => {
    const {cards} = this.state;
    const newCards = updateModels(cards, currentLayout);

    this.setState({cards: newCards});
  };

  onRemoveItem = i => {
    const {cards} = this.state;
    const newCards = removeModel(cards, i);
    this.setState({cards: newCards});
  };

  createElement = el => {
    const {coordinate, content} = el;

    return (
      <div key={coordinate.i} data-grid={coordinate}>
        <DataCard
          onRemoveItem={() => this.onRemoveItem(coordinate.i)}
          cardContent={selectModeToAdd(content.type)}
        />
      </div>
    );
  };

  render() {
    const {cards} = this.state;
    return (
      <PageHeaderWrapper>
        <ControlCard
          onSelectSymbol={this.onSelectSymbol}
          onAddModule={this.onAddItem}
        />
        <ReactGridLayout
          onLayoutChange={this.onLayoutChange}
          draggableHandle='.draggableZone'
          {...this.props}
        >
          {cards.map(this.createElement)}
        </ReactGridLayout>
      </PageHeaderWrapper>
    )
  }
}

