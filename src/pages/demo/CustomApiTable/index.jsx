import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useCallback } from 'react';

import MongoCollectionHelper from '@/components/MongoCollectionHelper'

import { doesCollectionExist, createCollection, modifyCollection } from '@/services/eiAdmin';


export default () => {

  const onSubmit = async (collectionData, ifCreate) => {
    let res;
    if (ifCreate) res = await createCollection(collectionData);
    if (!ifCreate) res = await modifyCollection(collectionData);
    return res;
  }

  const onCheckCollection = async (collectionName, ifCreate) => {
    const res = await doesCollectionExist(collectionName);

    if (ifCreate) return !res;
    if (!ifCreate) return res; // todo: needs `showCollection` method here, so that pass collectionInfo to child component `FieldList`
    return undefined
  }

  return (
    <PageHeaderWrapper>
      <MongoCollectionHelper
        onCheckCollection={onCheckCollection}
        onSubmit={onSubmit}
      />
    </PageHeaderWrapper>
  );
};
