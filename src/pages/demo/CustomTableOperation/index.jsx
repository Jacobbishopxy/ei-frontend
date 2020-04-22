import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState } from 'react';

import MongoCollectionHelper from '@/components/MongoCollectionHelper'

import {
  doesCollectionExist,
  createCollection,
  modifyCollection,
  showCollection
} from '@/services/eiAdmin';


export default () => {

  const [initFields, setInitFields] = useState([]);

  const clearFl = () => setInitFields([]);

  const onSubmit = async (collectionData, ifCreate) => {
    let res;
    if (ifCreate) res = await createCollection(collectionData);
    if (!ifCreate) res = await modifyCollection(collectionData);
    return res;
  }

  const onCheckCollection = async (collectionName, ifCreate) => {
    const res = await doesCollectionExist(collectionName);
    clearFl();

    if (ifCreate) return !res
    if (!ifCreate) {
      const {fields} = await showCollection(collectionName)
      if (res) setInitFields(fields);
      return res;
    }
    return undefined;
  }

  return (
    <PageHeaderWrapper>
      <MongoCollectionHelper
        initFields={initFields}
        onCheckCollection={onCheckCollection}
        onSubmit={onSubmit}
      />
    </PageHeaderWrapper>
  );
};
