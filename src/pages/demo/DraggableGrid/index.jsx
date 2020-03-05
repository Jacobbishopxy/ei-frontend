import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Button, Select } from 'antd';

import RGL, { WidthProvider } from 'react-grid-layout';
import _ from 'lodash';

import DataCardMain from '@/components/CustomPanel/DataCard';

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
        <DataCardMain onRemoveItem={() => this.onRemoveItem(i)}/>
      </div>
    );
  };

  render() {
    const {items} = this.state;
    return (
      <PageHeaderWrapper>
        <Select style={{width: 120, marginRight: 20}} onChange={this.onSelectItem} placeholder='选择模块'>
          <Select.Option value="embedLink">
            链接
          </Select.Option>
        </Select>
        <Button type='primary' onClick={this.onAddItem}>添加</Button>
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

