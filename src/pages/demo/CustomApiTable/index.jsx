import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';

import TableCreator from '@/components/TableCreator'


export default () => {

  const onSubmit = e => console.log(e)

  return (
    <PageHeaderWrapper>
      <TableCreator
        onSubmit={onSubmit}
      />
    </PageHeaderWrapper>
  );
};
