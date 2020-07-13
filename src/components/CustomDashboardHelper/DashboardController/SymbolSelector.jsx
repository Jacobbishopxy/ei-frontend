/**
 * Created by Jacob Xie on 7/6/2020.
 */

import React from 'react';
import { Input } from 'antd';


// todo: display symbol's company name by fetching API
export const SymbolSelector = ({onSelectSymbol, onSearchSymbol, defaultSymbol}) => {

  const selectSymbol = ({target: {value}}) => onSelectSymbol(value);
  const searchSymbol = ({target: {value}}) => onSearchSymbol(value);

  const inputField = <Input
    disabled
    onPressEnter={selectSymbol}
    onBlur={selectSymbol}
    defaultValue={defaultSymbol}
    placeholder="股票代码"
    size="small"
    style={{width: 120, marginRight: 5}}
  />;

  const inputSearchField = <Input.Search
    disabled
    onPressEnter={selectSymbol}
    onBlur={selectSymbol}
    onSearch={searchSymbol}
    defaultValue={defaultSymbol}
    placeholder="股票代码"
    size="small"
    style={{width: 120, marginRight: 5}}
  />;

  return (
    <>
      {
        onSearchSymbol === undefined ?
          <div>
            {inputField}
            <span style={{fontWeight: "bold", fontSize: 17, marginLeft: 10}}>招商银行</span>
          </div>
          : <div>
            {inputSearchField}
            <span style={{fontWeight: "bold", fontSize: 17, marginLeft: 10}}>招商银行</span>
          </div>

      }
    </>

  )
};

export default SymbolSelector;
