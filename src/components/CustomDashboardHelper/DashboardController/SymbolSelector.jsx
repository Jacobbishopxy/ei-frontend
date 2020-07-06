/**
 * Created by Jacob Xie on 7/6/2020.
 */

import React from 'react';
import { Input } from 'antd';


export const SymbolSelector = ({onSelectSymbol, onSearchSymbol, defaultSymbol}) => {

  const selectSymbol = ({target: {value}}) => onSelectSymbol(value);
  const searchSymbol = ({target: {value}}) => onSearchSymbol(value);


  return (
    <>
      {
        onSearchSymbol === undefined ?
          <Input
            onPressEnter={selectSymbol}
            onBlur={selectSymbol}
            defaultValue={defaultSymbol}
            placeholder="股票代码"
            size="small"
            style={{width: 120, marginRight: 10}}
          /> :
          <Input.Search
            onPressEnter={selectSymbol}
            onBlur={selectSymbol}
            onSearch={searchSymbol}
            defaultValue={defaultSymbol}
            placeholder="股票代码"
            size="small"
            style={{width: 120, marginRight: 10}}
          />
      }
    </>

  )
};

export default SymbolSelector;
