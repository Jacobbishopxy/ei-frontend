import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Button, Select } from 'antd';

import RGL, { WidthProvider } from 'react-grid-layout';
import _ from 'lodash';

import DataCardMain from '@/components/CustomPanel/DataCard';

const ResponsiveGridLayout = WidthProvider(RGL);

const tmpLink = 'http://grafana.ei.infore.com/d-solo/WfMG8caWk/xing-ye-shui-ni?orgId=1&from=1425371993587&to=1583224793588&var-region1=%E5%85%A8%E5%9B%BD&var-region2=%E5%8D%8E%E5%8C%97&var-region3=%E5%8D%8E%E4%B8%9C&panelId=6'

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
    console.log(value)
    this.setState({selectedItem: value})
  };

  onAddItem = () => {
    this.setState({
      items: this.state.items.concat({
        i: `n${this.state.newCounter}`,
        x: 0,
        y: Infinity,
        w: 6,
        h: 4
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
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
    this.setState({items: _.reject(this.state.items, {i: i})});
  };

  createElement = el => {
    const {i} = el;

    return (
      <div key={i} data-grid={el}>
        <DataCardMain
          onRemoveItem={() => this.onRemoveItem(i)}
        />
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

