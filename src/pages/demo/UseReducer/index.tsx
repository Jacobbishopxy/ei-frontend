/**
 * Created by Jacob Xie on 8/10/2020.
 */

import React, {useReducer} from 'react';
import _ from 'lodash';
import * as dashboardModel from '@/utilities/dashboardModel';
import {Button, Space} from "antd";

type Stores = dashboardModel.Store[];

enum Actions {
  create,
  update,
  delete,
}

type Action =
  | { type: Actions.create, store: dashboardModel.Store }
  | { type: Actions.update, store: dashboardModel.Store }
  | { type: Actions.delete, anchor: dashboardModel.Anchor }


const initialState: Stores = [];

const reducer = (state: Stores, action: Action) => {
  switch (action.type) {
    case Actions.create:
      return state.concat(action.store);
    case Actions.update:
      return _.map(state, ele => {
        if (ele.anchorConfig !== null) {
          if (_.isEqual(ele.anchorKey, action.store.anchorKey) &&
            _.isEqual(ele.anchorConfig, action.store.anchorConfig)) {
            return action.store
          }
          return ele;
        }
        if (_.isEqual(ele.anchorKey, action.store.anchorKey)) {
          return action.store
        }
        return ele;
      });
    case Actions.delete:
      return _.filter(state, ele => {
        if (ele.anchorConfig !== null) {
          return !_.isEqual(ele.anchorKey, action.anchor.anchorKey) &&
            !_.isEqual(ele.anchorConfig, action.anchor.anchorConfig);
        }
        return !_.isEqual(ele.anchorKey, action.anchor.anchorKey);
      })
    default:
      return state;
  }
}


export default () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const create = () => dispatch({
    type: Actions.create,
    store: {
      anchorKey: {identity: "id#1", category: dashboardModel.CategoryType.embedLink},
      anchorConfig: {symbol: "000001", date: "20190101"},
      content: {data: "dev", config: {version: 1}}
    }
  });

  const update = () => dispatch({
    type: Actions.update,
    store: {
      anchorKey: {identity: "id#1", category: dashboardModel.CategoryType.embedLink},
      anchorConfig: {symbol: "000001", date: "20190101"},
      content: {data: "dev-updated", config: {version: 2}}
    }
  });

  const remove = () => dispatch({
    type: Actions.delete,
    anchor: {
      anchorKey: {identity: "id#1", category: dashboardModel.CategoryType.embedLink},
      anchorConfig: {symbol: "000001", date: "20190101"},
    }
  });

  return (
    <Space direction="vertical">
      <Button onClick={create}>
        Create
      </Button>
      <Button onClick={update}>
        Update
      </Button>
      <Button onClick={remove}>
        Delete
      </Button>
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    </Space>
  );
};
