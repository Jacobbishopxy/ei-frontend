import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import CementTable from './CementTable';
import CementTableEdit from './CementTableEdit';
export default () => {
  return (
    <PageHeaderWrapper>
      <CementTableEdit />
      {/*<div*/}
      {/*  style={{*/}
      {/*    paddingTop: 10,*/}
      {/*    textAlign: 'center',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <CementTable />*/}
      {/*</div>*/}
    </PageHeaderWrapper>
  );
};
