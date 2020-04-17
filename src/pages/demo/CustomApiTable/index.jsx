import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useCallback } from 'react';

import MongoCollectionHelper from '@/components/MongoCollectionHelper'

import { doesCollectionExist, createCollection, modifyCollection } from '@/services/eiAdmin';


export default () => {

  const onSubmit = (collectionData, ifCreate) =>
    console.log(collectionData, ifCreate)

  const onCheckCollection = async (collectionName, ifCreate) => {
    const res = await doesCollectionExist(collectionName);

    if (ifCreate) return !res;
    if (!ifCreate) return res;
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
