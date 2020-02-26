import React from 'react';
import { Card, Typography, Alert, Icon } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default () => (
  <PageHeaderWrapper>
    <Card>
      <Alert
        message="umi ui 现已发布，欢迎使用 npm run ui 启动体验。"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 48,
        }}
      />
      <Typography.Title
        level={2}
        style={{
          textAlign: 'center',
        }}
      >
        <Icon type="smile" theme="twoTone" /> Ant Design Pro{' '}
        <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /> You
      </Typography.Title>
    </Card>
  </PageHeaderWrapper>
);
