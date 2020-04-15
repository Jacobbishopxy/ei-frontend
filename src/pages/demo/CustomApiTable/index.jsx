import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';

import TableCreator from '@/components/TableCreator'


export default () => {

  const onSubmit = e =>
    console.log(e)

  // todo: `onCheckCollection(collectionName, ifCreateCollection)` should have functionalities as following:
  //  1. accept string input and mode type (`create` and `modify`)
  //  2. if `create`, list all collections and check if duplicated
  //  3. if `modify`, return `fieldList` (query-api index & validator) if collection exists
  const onCheckCollection = (n, t) => {

    console.log(`collectionName: ${n}, ifCreateCollection: ${t}`)
    if (n === 'dd') {
      return true
    }
    if (n === 'd') {
      return false
    }
    return undefined
  }

  return (
    <PageHeaderWrapper>
      <TableCreator
        onCheckCollection={onCheckCollection}
        onSubmit={onSubmit}
      />
    </PageHeaderWrapper>
  );
};
