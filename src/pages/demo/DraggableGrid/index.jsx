import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Button, Select } from 'antd';

import RGL, { WidthProvider } from 'react-grid-layout';
import _ from 'lodash';

import DataCard from '@/components/CustomPanel/DataCard';
import ControlCard from '@/components/CustomPanel/ControlCard';

const ResponsiveGridLayout = WidthProvider(RGL);

export default class CustomGrid extends React.PureComponent {

  static defaultProps = {
    className: 'layout',
    cols: 12,
    breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
    rowHeight: 110,
  };

  constructor(props) {
    super(props);

    this.state = {
      items: [0].map(i => ({
        i: i.toString(),
        x: (i % 2) * 6,
        y: (i % 2) * 2,
        w: 6,
        h: 4
      })),
      newCounter: 0,
      selectedItem: null,
    };
  }

  onSelectSymbol = value => {
    console.log(value.target.value)
  };

  onSelectDate = (date, dateString) => {
    console.log(date)
    console.log(dateString)
  }

  onSelectItem = value => {
    this.setState({selectedItem: value})
  };

  onAddItem = () => {
    const {items, newCounter} = this.state;
    const newItems = items.concat({
      i: `n${newCounter}`,
      x: 0,
      y: Infinity,
      w: 6,
      h: 4
    });

    this.setState({items: newItems, newCounter: newCounter + 1});
  };

  onLayoutChange = currentLayout => {
    this.setState({layout: currentLayout});
  };

  onBreakpointChange = (newBreakpoint, newCols) => {
    this.setState({
      breakpoint: newBreakpoint,
      cols: newCols
    });
  };

  onRemoveItem = i => {
    const {items} = this.state;
    this.setState({items: _.reject(items, {i})});
  };

  createElement = el => {
    const {i} = el;

    return (
      <div key={i} data-grid={el}>
        <DataCard onRemoveItem={() => this.onRemoveItem(i)}/>
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
          onSelectModule={this.onSelectItem}
          onAddModule={this.onAddItem}
        />
        <ResponsiveGridLayout
          layout={items}
          onLayoutChange={this.onLayoutChange}
          onBreakPointChange={this.onBreakpointChange}
          {...this.props}
        >
          {items.map(this.createElement)}
        </ResponsiveGridLayout>
      </PageHeaderWrapper>
    )
  }
}

