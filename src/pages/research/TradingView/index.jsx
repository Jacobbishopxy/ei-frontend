import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';

export default () =>
  (
    <PageHeaderWrapper content="TradingView Demo" className={styles.main}>
      <div style={{paddingTop: 10, textAlign: 'center'}}/>
    </PageHeaderWrapper>
  );
