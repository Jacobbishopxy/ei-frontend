import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { message } from 'antd';
import RGL, { WidthProvider } from 'react-grid-layout';
import _ from 'lodash';

import DataCard from '@/components/CustomPanel/DataCard';
import ControlCard from '@/components/CustomPanel/ControlCard';
import EmbedLinkContent from '@/components/CustomPanel/EmbedLinkContent';

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
      items: [0].map(i => ({
        i: i.toString(),
        x: (i % 2) * 6,
        y: (i % 2) * 2,
        w: 6,
        h: 4,
        selectedMode: 'embedLink'
      })),
      newCounter: 0
    };
  }

  onSelectSymbol = value => {
    console.log(value.target.value)
  };

  onSelectDate = (date, dateString) => {
    console.log(date)
    console.log(dateString)
  };

  onAddItem = selectedMode => {
    const sm = selectedMode.key;
    if (sm != null) {
      const {items, newCounter} = this.state;
      const {cols} = this.props;
      const newItems = items.concat({
        i: `n${newCounter}`,
        x: (items.length * 6) % cols,
        y: Infinity,
        w: 6,
        h: 4,
        selectedMode: sm
      });
      this.setState({items: newItems, newCounter: newCounter + 1});
    } else {
      message.warning('请选择一种模块添加')
    }
  };

  // todo: local提供记住当前布局，后端提供commit后全局布局
  onLayoutChange = currentLayout => {
    this.setState({layout: currentLayout});
  };

  onRemoveItem = i => {
    const {items} = this.state;
    this.setState({items: _.reject(items, {i})});
  };

  createElement = el => {
    const {i, selectedMode} = el;

    return (
      <div key={i} data-grid={el}>
        <DataCard
          onRemoveItem={() => this.onRemoveItem(i)}
          cardContent={selectModeToAdd(selectedMode)}
        />
      </div>
    );
  };

  render() {
    const {items} = this.state;
    return (
      <PageHeaderWrapper>
        <ControlCard
          onSelectSymbol={this.onSelectSymbol}
          onSelectDate={this.onSelectDate}
          onAddModule={this.onAddItem}
        />
        <ReactGridLayout
          layout={items}
          onLayoutChange={this.onLayoutChange}
          draggableHandle='.draggableZone'
          {...this.props}
        >
          {items.map(this.createElement)}
        </ReactGridLayout>
      </PageHeaderWrapper>
    )
  }
}

