import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => (
  <PageHeaderWrapper>
    <Card>
      <div style={{textAlign: 'center'}}>
        欢迎来到盈峰资本-权益投资部主页！
      </div>
    </Card>
  </PageHeaderWrapper>
);
