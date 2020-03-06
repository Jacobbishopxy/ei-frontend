/**
 * Created by Jacob Xie on 3/4/2020.
 */

import React from 'react';
import { Button, Input, Select, DatePicker } from 'antd';

import styles from './index.less'


const ControlCard = ({onSelectSymbol, onSelectDate, onSelectModule, onAddModule}) => {
  return (
    <div className={styles.cardMain}>
      <div className={styles.cardContent}>
        <Input
          onPressEnter={onSelectSymbol}
          onBlur={onSelectSymbol}
          placeholder='选择股票'
          style={{width: 120, marginRight: 20}}
        />
        <DatePicker
          onChange={onSelectDate}
          format='YYYY-M-DD'
          picker='week'
          placeholder='选择日期'
          style={{marginRight: 20}}
        />
      </div>
      <div className={styles.cardContent}>
        <div>
          <Select style={{width: 120, marginRight: 20}} onChange={onSelectModule} placeholder='选择模块'>
            <Select.Option value="embedLink">链接</Select.Option>
            <Select.Option value="text">文字</Select.Option>
            <Select.Option value="image">图片</Select.Option>
          </Select>
          <Button type='primary' onClick={onAddModule}>添加</Button>
        </div>
      </div>
    </div>
  );
};

export default ControlCard;
