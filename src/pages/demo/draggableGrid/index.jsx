import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Button, Divider } from 'antd';

import RGL, { WidthProvider } from 'react-grid-layout';
import _ from 'lodash';
import styles from './index.less'

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
      items: [0, 1].map(i => ({
        i: i.toString(),
        x: (i % 2) * 6,
        y: (i % 2) * 2,
        w: 6,
        h: 4
      })),
      newCounter: 0,
    };
  }

  onAddItem = () => {
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
      <div key={i}
           className={styles.customCardLayer}
           data-grid={el}
      >
        <div className={styles.cardHead}>
          <Button
            shape='circle'
            size='small'
            onClick={() => this.onRemoveItem(i)}
          >
            🗑️
          </Button>
        </div>
        <embed
          className={styles.cardContent}
          src="https://snapshot.raintank.io/dashboard-solo/snapshot/y7zwi2bZ7FcoTlB93WN7yWO4aMiz3pZb?from=1493369923321&to=1493377123321&panelId=4"
        />
      </div>
    );
  };

  render() {
    const {items} = this.state;
    return (
      <PageHeaderWrapper>
        <Button type='primary' onClick={this.onAddItem}>Add Item</Button>
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

