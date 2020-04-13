/**
 * Created by Jacob Xie on 4/13/2020.
 */

import React from 'react';
import { Button, Card, Space } from 'antd';


const FieldDisplay = ({field, index, onRemove}) => {
  const title = `字段序号 ${index + 1}`
  const extra = <Button onClick={onRemove} size='small' type='link' danger ghost>删除</Button>
  const style = field.indexOption ? {backgroundColor: 'rgba(114, 46, 209, 0.2)'} : {}

  return (
    <Card
      title={title}
      style={{width: 200, height: 180, ...style}}
      size='small'
      extra={extra}
    >
      <div>英文字段: {field.fieldName}</div>
      <div>中文别名: {field.nameAlias}</div>
      <div>数据类型: {field.fieldType}</div>
      <div>关键字段: {field.indexOption}</div>
      <div>字段描述: {field.description}</div>
    </Card>
  )
};

export default ({fieldList, onRemoveField}) => {
  if (fieldList.length) {
    return (
      <Space>
        {fieldList.map((field, index) => (
          <div key={field.fieldName}>
            <FieldDisplay
              field={field}
              index={index}
              onRemove={() => onRemoveField(index)}
            />
          </div>
        ))}
      </Space>
    )
  }
  return <div style={{height: 180}}/>
}
