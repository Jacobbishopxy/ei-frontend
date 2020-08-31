/**
 * Created by Jacob Xie on 7/6/2020.
 */

import React, {useState} from 'react';
import {Select, Space} from 'antd';


export const SymbolSelector = ({symbolList, onChangeSymbol, defaultSymbol}) => {

  const [symbol, setSymbol] = useState(defaultSymbol)

  const selectOnChange = value => {
    onChangeSymbol(value)
    setSymbol(value)
  }

  const findSymbolName = () =>
    symbolList.filter(i => i.key === symbol)[0].name

  const findSymbolAuthor = () =>
    symbolList.filter(i => i.key === symbol)[0].author

  return (
    <Space>
      <Select
        style={{width: 150}}
        onChange={selectOnChange}
        defaultValue={defaultSymbol}
      >
        {
          symbolList.map(n =>
            <Select.Option key={n.key} value={n.key}>
              {n.key}
            </Select.Option>
          )
        }
      </Select>
      <span style={{fontWeight: "bold"}}>{findSymbolName(symbol)}</span>
      <span style={{color: "gray"}}>{findSymbolAuthor(symbol)}</span>
    </Space>
  )
}

export default SymbolSelector;
