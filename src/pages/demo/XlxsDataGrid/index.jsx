/**
 * Created by Jacob Xie on 3/9/2020.
 */

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import Papa from 'papaparse';

import styles from './index.less';



export default () => {
  const [clipboard, setClipboard] = useState("");

  const readFromClipboard = ({target: {value}}) => {
    try {
      const convertedData = Papa.parse(value, {skipEmptyLines: true}).data;
      console.log(convertedData);
      setClipboard(convertedData);
    } catch (e) {
      console.log('parsing error: ');
      console.log(e);
    }
  };

  return (
    <PageHeaderWrapper>

      <Input.TextArea
        rows={4}
        allowClear
        onBlur={readFromClipboard}
      />
      <br/>

      <Button
        onClick={() => alert(`your clipboard contains: ${clipboard}`)}
      >
        读取数据
      </Button>



    </PageHeaderWrapper>
  )
};
