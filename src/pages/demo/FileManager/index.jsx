/**
 * Created by Jacob Xie on 7/13/2020.
 */

import React from 'react';

import { FileManager, FileNavigator } from '@opuscapita/react-filemanager';
import connectorNodeV1 from '@opuscapita/react-filemanager-connector-node-v1';

const context = '600036.SH 招商银行';

const apiOptions = {
  ...connectorNodeV1.apiOptions,
  apiRoot: `http://192.168.50.130:4013/bank/${context}`
}

export default () => {
  return (
    <div style={{height: '480px'}}>
      <FileManager>
        <FileNavigator
          id="filemanager-1"
          api={connectorNodeV1.api}
          apiOptions={apiOptions}
          // initialResourceId="Lw"
          capabilities={connectorNodeV1.capabilities}
          listViewLayout={connectorNodeV1.listViewLayout}
          viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
        />
      </FileManager>
    </div>
  );
};
