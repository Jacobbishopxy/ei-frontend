import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'antd';

import RGL, { WidthProvider } from 'react-grid-layout';
import _ from 'lodash';

const ResponsiveGridLayout = WidthProvider(RGL);

export default class MyResponsiveGrid extends React.PureComponent {

  static defaultProps = {
    className: 'layout',
    cols: 12,
    breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
    rowHeight: 100,
    // onLayoutChange: () => {}
  };

  constructor(props) {
    super(props);

    this.clientRef = React.createRef();

    this.state = {
      items: [0, 1, 2, 3].map(i => ({
        i: i.toString(),
        x: (i % 2) * 6,
        y: (i % 2) * 2,
        w: 6,
        h: 2
      })),
      newCounter: 0,
    };

  }

  onAddItem = () => {
    console.log('adding', `n${this.state.newCounter}`);
    this.setState({
      items: this.state.items.concat({
        i: `n${this.state.newCounter}`,
        x: 0,
        y: Infinity,
        w: 6,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  };

  onLayoutChange = (currentLayout, allLayouts) => {
    // this.props.onLayoutChange(layout);
    this.setState({layout: currentLayout});
  };

  onBreakpointChange = (newBreakpoint, newCols) => {
    this.setState({
      breakpoint: newBreakpoint,
      cols: newCols
    });
  };

  onRemoveItem = i => {
    console.log('removing', i);
    this.setState({items: _.reject(this.state.items, {i: i})});
  };

  createElement = el => {
    const {i} = el;
    return (
      <Card key={i}
            data-grid={el}
            size='small'
            extra={
              <Button
                type='danger'
                shape='circle'
                size='small'
                className="remove"
                onClick={() => this.onRemoveItem(i)}
              >
                X
              </Button>
            }
      >
        <span className="text">{i}</span>
      </Card>
    );
  };

  render() {
    const layouts = () => null;
    return (
      <PageHeaderWrapper>
        <Button type='primary' onClick={this.onAddItem}>Add Item</Button>
        <ResponsiveGridLayout
          // onLayoutChange={this.onLayoutChange}
          onLayoutChange={layouts}
          onBreakPointChange={this.onBreakpointChange}
          {...this.props}
        >
          {this.state.items.map(this.createElement)}
        </ResponsiveGridLayout>
      </PageHeaderWrapper>
    )
  }
}

